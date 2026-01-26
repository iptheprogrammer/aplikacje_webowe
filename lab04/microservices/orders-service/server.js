// (Port 3002)
const express = require("express");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./orders_db.sqlite",
  logging: false,
});

const Order = sequelize.define("order", {
  userId: Sequelize.INTEGER,
  bookId: Sequelize.INTEGER,
  quantity: Sequelize.INTEGER,
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

app.get("/api/orders/:userId", async (req, res) => {
  const orders = await Order.findAll({ where: { userId: req.params.userId } });
  res.json(orders);
});

app.post("/api/orders", authenticateToken, async (req, res) => {
  const { userId, bookId, quantity } = req.body;

  try {
    await axios.get(`http://localhost:3001/api/books/${bookId}`);

    з;
    const order = await Order.create({ userId, bookId, quantity });
    res.json(order);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Book not found or Books Service unavailable" });
  }
});

app.delete("/api/orders/:id", authenticateToken, async (req, res) => {
  await Order.destroy({ where: { id: req.params.id } });
  res.json({ message: "Order deleted" });
});

app.patch("/api/orders/:id", authenticateToken, async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.sendStatus(404);

  if (req.body.quantity) order.quantity = req.body.quantity;
  await order.save();
  res.json(order);
});

app.listen(3002, () => console.log("Orders Service running on port 3002"));
