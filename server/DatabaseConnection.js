require("dotenv").config();
const mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "database-0.chy844gqevgm.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "A123456789s",
  database: "esdir",
});

// var connection  = mysql.createConnection({
//     host: "192.168.1.229",
//     user: "ace",
//     password:"12345678",
//     database:"esdir"
//   })
// Create the connection to the database
//var connection = mysql.createConnection(process.env.DATABASE_URL)

connection.connect((err) => {
  if (err) {
    //console.log("error", err)
    throw err;
  }
  //console.log("Database connected successfully!")
});

module.exports = connection;
