const dbConnection = require("./DatabaseConnection.js");
const util = require("util");
const queryAsync = util.promisify(dbConnection.query).bind(dbConnection);
const bcrypt = require("bcryptjs");

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

// Function to register a new user
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await queryAsync(
      `INSERT INTO user (email, password) VALUES ('${email}', '${password}');`
    );
    res.send({ result: result, code: "success", roles: "2001" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Function to register a new user
const upload = async (req, res) => {
  const { upload } = req.body;
  console.log(upload);

  try {
    const result = await queryAsync(
      //`CREATE TABLE building ( buildingID int NOT NULL AUTO_INCREMENT, buildingName varchar(50) UNIQUE, coordinates varchar(100), PRIMARY KEY (buildingID));`
      //`DROP table building`
      //`SELECT * from building`
      `INSERT INTO building (buildingName, coordinates) VALUES ('${upload.buildingName}', '${upload.coordinates}');`
    );
    res.send({ result: result, code: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Function to register a new user
const loginUser = async (req, res) => {
  const { user, pwd } = req.body;

  // Retrieve user from the database
  const query = `SELECT email, password FROM user WHERE email = '${user}';`;

  try {
    const result = await queryAsync(query);

    if (!result) {
      // User not found
      return res.status(401).send("Invalid email or password");
    }

    const { password } = result[0];

    // Compare the provided password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(pwd, password);

    if (passwordMatch) {
      // Passwords match, login successful
      res.send({
        code: "success",
        message: "Login successful",
        user: user,
        roles: 2001,
      });
    } else {
      // Passwords do not match
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const retrieveLocationData = async (req, res) => {
  try {
    var query;
    query = "SELECT * from building";

    const result = await queryAsync(query);
    res.send(result);
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
    // query =  ""
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
  registerUser,
  queryData,
  loginUser,
  upload,
  retrieveLocationData,
};
