const mysql = require("mysql")

var connection  = mysql.createConnection({
    host: "192.168.1.229",
    user: "ace",
    password:"12345678",
    database:"esdir"
  })

  connection .connect((err)=>{
    if(err){
      console.log("error", err)
      throw err
    };
    console.log("Database connected successfully!")
  })


module.exports = connection ;
