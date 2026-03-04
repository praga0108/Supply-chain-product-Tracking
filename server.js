const express = require("express");
require("dotenv").config();
const app = express();
const PORT = 5000;

console.log("Server file is running...");

require("./config/db");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/products", async (req, res) => {
  try {
    const client = require("./config/db");
    const result = await client.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching products");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});

app.put("/products/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const client = require("./config/db");

    const result = await client.query(
      "UPDATE products SET status = $1 WHERE id = $2 RETURNING *",
      [status, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating status");
  }
});

app.post("/products", async (req, res) => {
  try {
    const { name, origin, status } = req.body;
    const client = require("./config/db");

    const result = await client.query(
      "INSERT INTO products (name, origin, status) VALUES ($1, $2, $3) RETURNING *",
      [name, origin, status]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating product");
  }
});