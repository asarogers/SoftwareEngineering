const dbConnection = require("./DatabaseConnection.js");
const util = require('util');
const queryAsync = util.promisify(dbConnection.query).bind(dbConnection);


// Function to read all records from the "user" table
const readFromTable = async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM user;");
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Function to read all records from the "tablenames" table
const getTableNames = async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM tablenames;");
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Placeholder function for handling POST requests to insert data into a table
const postIntoTable = (req, res) => {
  // Add your logic here based on the requirements
  res.send("Placeholder function - Add logic for inserting data into a table");
};

// Function to update records in the "scrappedData" table
const insertIntoTable = async (req, res) => {
  const { results, dictionary, targetColumn } = req.body;

  try {
    const updates = results.map((elem) => {
      return queryAsync(
        `UPDATE scrappedData SET ${targetColumn} = '${dictionary[elem.url]}' WHERE url = '${elem.url}';`
      );
    });

    // Wait for all updates to complete before sending the response
    await Promise.all(updates);

    console.log("done with insertion");
    res.send("Records updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


// Function to register a new user
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await queryAsync(
      `INSERT INTO user (email, password) VALUES ('${email}', '${password}');`
    );
    res.send({result: result, code: "success"});
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Function to query data from the "user" table using async/await
const queryData = async (req, res) => {
  try {
    var query;
    //query = 'Drop Table user';
    //query = 'CREATE TABLE user ( userID int NOT NULL AUTO_INCREMENT, email varchar(50) UNIQUE,  password varchar(100), PRIMARY KEY (userID) );';
     query =  ""
    // query =  "GRANT ALL PRIVILEGES ON sql5680080.* TO 'sql5680080'@'%';"
    // query =  "ALTER TABLE user MODIFY COLUMN password VARCHAR(100);"
    const result = await queryAsync(query);
    console.log(result);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Exporting all the functions
module.exports = {
  readFromTable,
  getTableNames,
  postIntoTable,
  insertIntoTable,
  registerUser,
  queryData
};
