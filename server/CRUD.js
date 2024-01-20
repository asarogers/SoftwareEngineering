const dbConnection = require("./DatabaseConnection.js");

function readCommand(req, res) {
  dbConnection.query(
    `SELECT * FROM commands`,
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

const registerUser = async (email, password, res) => {
  try {
      if (email.includes(process.env.REACT_APP_WORD)) {
          //check if user exist
          const userExist = await UserModel.findOne({ email: email })

          //if user does exist, update their password
          if (userExist) {
              console.log(password)
              const update = await UserModel.updateOne({ email: email }, { "$set": { password: password } });
              //console.log(userExist)
              res.send({ code: "success", role: userExist.role, email: userExist.email, accessToken: userExist._id })
          } else {
              //if not, return failure
              res.send("Email does not exist, you must use the code first")
          }
      }
      else {
          res.send("No personal emails")
      }

  }
  catch (error) {
      res.json("error")
  }

}

const queryData = async (req, res) => {
  dbConnection.query(
    `Create Table users(userID int, email varchar(50),  password varchar(50))`,
    function (err, result, fields) {
      if (err) throw err;
      msg = result;
    }
  );
  res.send(msg)
}

module.exports = {
  insertIntoTable: insertIntoTable,
  readCommand: readCommand,
  postIntoTable: postIntoTable,
  getTableNames: getTableNames,
  registerUser: registerUser,
  queryData: queryData
};
