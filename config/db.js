const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

pool.connect((err, client, release) => {
  if (err) return console.error("❌ Connection error:", err.message);
  console.log("✅ PostgreSQL Connected Successfully");
  release();
});

module.exports = pool;