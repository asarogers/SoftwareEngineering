require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "database-0.chy844gqevgm.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "A123456789s",
  database: "esdir",
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database connected successfully!");
});

module.exports = connection;
