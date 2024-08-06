const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "sample",
  password: "12345",
  database: "shopify_webhook_db",
});

module.exports = pool.promise();
