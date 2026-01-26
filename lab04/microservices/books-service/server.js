// (Port 3001)
const express = require("express");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./books_db.sqlite",
  logging: false,
});

const Book = sequelize.define("book", {
  title: Sequelize.STRING,
  author: Sequelize.STRING,
  year: Sequelize.INTEGER,
});

sequelize.sync();

const SECRET_KEY = "my_super_secret_key";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get("/api/books", async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

app.get("/api/books/:id", async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) res.json(book);
  else res.status(404).json({ error: "Not found" });
});

app.post("/api/books", authenticateToken, async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.json(book);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete("/api/books/:id", authenticateToken, async (req, res) => {
  await Book.destroy({ where: { id: req.params.id } });
  res.json({ message: "Deleted" });
});

app.listen(3001, () => console.log("Books Service running on port 3001"));
