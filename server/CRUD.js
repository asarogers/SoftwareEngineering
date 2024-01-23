const dbConnection = require("./DatabaseConnection.js");

function readFromTable(req, res) {
  dbConnection.query(
    `SELECT * FROM user`,
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    }
  );
}

function getTableNames(req, res) {
  dbConnection.query(
    `SELECT * FROM tablenames`,
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    }
  );
}

function postIntoTable(req, res) {
  const { columnName, results, university, database } = req.body;

 
}

function insertIntoTable(req, res) {
  const { results, dictionary, targetColumn } = req.body;
  var msg;
  console.log(dictionary);
  results.forEach((elem) => {
    // use the url as a key for dictioanry to insert data into the target column
    dbConnection.query(
      `UPDATE scrappedData SET ${targetColumn} = '${
        dictionary[elem.url]
      }' where url = '${elem.url}'`,
      function (err, result, fields) {
        if (err) throw err;
        msg = result;
      }
    );
  });

  console.log("done with insertion");
  res.send(msg);
}

const registerUser = async (req, res) => {
  const {email, password} = req.body
  console.log(email, password)
  //get email, passsword 
  var msg;
  dbConnection.query(
    `insert into user (email, password) values('${email}', '${password}');`,
    function (err, result, fields) {
      if (err) throw err;
      msg = result;
    }
  );
  res.send(msg)
}

const queryData = async (req, res) => {
  var msg;
  dbConnection.query(
   'CREATE TABLE user ( userID int NOT NULL AUTO_INCREMENT, email varchar(50),  password varchar(50), PRIMARY KEY (userID) );', 
   //'Drop Table users',
   //'select * from user',
   //"ALTER TABLE user MODIFY COLUMN password VARCHAR(100);",
   function (err, result, fields) {
      if (err) throw err;
      msg = result;
    }
  );
  console.log(msg)
  res.send(msg)
}



module.exports = {
  insertIntoTable: insertIntoTable,
  readFromTable: readFromTable,
  postIntoTable: postIntoTable,
  getTableNames: getTableNames,
  registerUser: registerUser,
  queryData: queryData
};
