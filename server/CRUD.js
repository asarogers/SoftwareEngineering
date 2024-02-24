const dbConnection = require("./DatabaseConnection.js");
const util = require("util");
const queryAsync = util.promisify(dbConnection.query).bind(dbConnection);
const bcrypt = require("bcryptjs");

const readFromTable = async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM user;");
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await queryAsync(
      `INSERT INTO user (email, password) VALUES ('${email}', '${password}');`
    );
    res.send({ result, code: "success", roles: "2001" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const uploadBuilding = async (req, res) => {
  const { upload } = req.body;
  try {
    const result = await queryAsync(
      `INSERT INTO building (buildingName, coordinates) VALUES ('${upload.buildingName}', '${upload.coordinates}');`
    );
    res.send({ result, code: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const loginUser = async (req, res) => {
  const { user, pwd } = req.body;
  const query = `SELECT email, password FROM user WHERE email = '${user}';`;

  try {
    const result = await queryAsync(query);

    if (!result) {
      return res.status(401).send("Invalid email or password");
    }

    const { password: hashedPassword } = result[0];
    const passwordMatch = await bcrypt.compare(pwd, hashedPassword);

    if (passwordMatch) {
      res.send({
        code: "success",
        message: "Login successful",
        user,
        roles: 2001,
      });
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const retrieveLocationData = async (req, res) => {
  try {
    const query = "SELECT * from building";
    const result = await queryAsync(query);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const postCartItem = async(req, res) => {
  console.log(req.body);
  try {
    const result = await queryAsync(
      `INSERT INTO orders (user, label, price, image) VALUES ('${req.body.user}', '${req.body.cartItem.label}', '${req.body.cartItem.price}', '${req.body.cartItem.image}');`
    );
    res.send({ result, code: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const queryData = async (req, res) => {
  try {
    // Define your query here
    let query = "...";
    // query = 'Drop Table user';
    // query = 'CREATE TABLE  orders (orderID int NOT NULL AUTO_INCREMENT, user varchar(50),  label varchar(20), price DECIMAL(13, 2) NOT NULL, image VARCHAR(20), PRIMARY KEY (orderID));';
    // query =  ""
    // query =  "GRANT ALL PRIVILEGES ON sql5680080.* TO 'sql5680080'@'%';"
    // query =  "ALTER TABLE user MODIFY COLUMN password VARCHAR(100);"
    
    const result = await queryAsync(query);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  postCartItem,
  readFromTable,
  registerUser,
  queryData,
  loginUser,
  uploadBuilding,
  retrieveLocationData,
};
