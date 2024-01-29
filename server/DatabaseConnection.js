require('dotenv').config()
const mysql = require("mysql2")

var connection  = mysql.createConnection({
  host: "sql5.freesqldatabase.com",
    user: "sql5680080",
    password:"V5DaAUXJIB",
    database:"sql5680080"
})

// var connection  = mysql.createConnection({
//     host: "192.168.1.229",
//     user: "ace",
//     password:"12345678",
//     database:"esdir"
//   })
// Create the connection to the database
//var connection = mysql.createConnection(process.env.DATABASE_URL)

  connection .connect((err)=>{
    if(err){
      console.log("error", err)
      throw err
    };
    console.log("Database connected successfully!")
  })


module.exports = connection ;
