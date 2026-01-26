import React, { useState, useEffect } from "react";

const CounterItem = ({ counter, onUpdate, onDelete }) => {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={styles.counterName}>{counter.name}</span>
        <button onClick={() => onDelete(counter.id)} style={styles.deleteBtn}>
          --
        </button>
      </div>
      <div style={styles.controls}>
        <button onClick={() => onUpdate(counter.id, -1)} style={styles.btn}>
          -
        </button>
        <span style={styles.value}>{counter.value}</span>
        <button onClick={() => onUpdate(counter.id, 1)} style={styles.btn}>
          +
        </button>
      </div>
    </div>
  );
};

const CounterList = ({ counters, onUpdate, onDelete }) => {
  if (!counters || counters.length === 0) {
    return <p style={styles.emptyText}>Brak liczników</p>;
  }
  return (
    <div style={styles.listContainer}>
      {counters.map((counter) => (
        <CounterItem
          key={counter.id}
          counter={counter}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

const AddCounter = ({ onAdd }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") return;
    onAdd(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Nazwa licznika..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.addBtn}>
        Dodaj
      </button>
    </form>
  );
};

const App = () => {
  const [counters, setCounters] = useState(() => {
    try {
      const saved = localStorage.getItem("counters");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("counters", JSON.stringify(counters));
  }, [counters]);

  useEffect(() => {
    const totalSum = counters.reduce((acc, curr) => acc + curr.value, 0);
    console.log(`Suma: ${totalSum}`);
  }, [counters]);

  const addCounter = (name) => {
    setCounters([...counters, { id: Date.now(), name, value: 0 }]);
  };

  const updateCounter = (id, delta) => {
    setCounters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, value: c.value + delta } : c))
    );
  };

  const deleteCounter = (id) => {
    setCounters((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div style={styles.appContainer}>
      <h1 style={styles.header}>Licznik React</h1>
      <AddCounter onAdd={addCounter} />
      <hr style={styles.divider} />
      <CounterList
        counters={counters}
        onUpdate={updateCounter}
        onDelete={deleteCounter}
      />
    </div>
  );
};

const styles = {
  appContainer: {
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "1rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontFamily: "sans-serif",
  },
  header: { textAlign: "center", marginBottom: "20px" },
  divider: { margin: "20px 0", borderTop: "1px solid #eee" },
  form: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: { flex: 1, padding: "8px" },
  addBtn: {
    padding: "8px 16px",
    background: "blue",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  emptyText: { textAlign: "center", color: "#999" },
  listContainer: { display: "flex", flexDirection: "column", gap: "10px" },
  card: {
    padding: "10px",
    background: "#dededeff",
    border: "1px solid #686767ff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardHeader: { display: "flex", alignItems: "center", gap: "10px" },
  counterName: { fontWeight: "bold" },
  controls: { display: "flex", alignItems: "center", gap: "5px" },
  value: { fontWeight: "bold", width: "30px", textAlign: "center" },
  btn: { width: "30px", height: "30px", cursor: "pointer" },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    cursor: "pointer",
    fontSize: "10px",
  },
};

export default App;
