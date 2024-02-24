const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const {
  postCartItem,
  readFromTable,
  registerUser,
  queryData,
  loginUser,
  uploadBuilding,
  retrieveLocationData
} = require("./CRUD.js");
const { sendCommand } = require("./sendCommand.js");
const connectToServer = require("../sockets/server.js");

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/read-all", readFromTable);
app.get("/get-data", queryData);
app.get("/get-locations", retrieveLocationData);

app.post("/post-cartItem", postCartItem);
app.post("/send-command", sendCommand);
app.post("/register", registerUser);
app.post("/login", loginUser);
app.post("/upload-building", uploadBuilding);

// Socket Connection
connectToServer();

// Server Setup
const PORT = parseInt(process.env.PORT) + 1 || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
