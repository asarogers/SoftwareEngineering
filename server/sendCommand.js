const dbConnection = require("./DatabaseConnection.js");

async  function sendCommand(req, res){
  const {command} = req.body

  const table = "commands"
  var msg = "successfully";
  
  dbConnection.query(
    `UPDATE ${table} SET command = '${command.label}' where id = ${1};`,

    function (err, result, fields) {
      if (err) throw err;
      msg = result;
    }
  );

  res.send(msg)
}

module.exports = {sendCommand: sendCommand}


