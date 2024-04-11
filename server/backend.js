const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const CRUD = require("./CRUD.js");
const {sendCommand} = require("./sendCommand.js");
const SocketServer = require("../sockets/server.js");

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Socket Connection
const socket = SocketServer;
socket.startServer();


// Routes
app.get("/read-all", CRUD.readFromTable);
app.get("/get-data", CRUD.queryData);
app.get("/get-locations", CRUD.retrieveLocationData);


app.post("/retrieve-gps-coordinates", SocketServer.retrieveGPSCoordinates);
app.post("/post-cartItem", CRUD.postCartItem);
app.post("/send-command", sendCommand);
app.post("/register", CRUD.registerUser);
app.post("/login", CRUD.loginUser);
app.post("/upload-building", CRUD.uploadBuilding);
app.post("/retrieve-cartItem", CRUD.retrieveCartItem);
app.post("/delete-item", CRUD.deleteItem);
app.post("/start-robot", socket.startRobot);




// Server Setup
const PORT = parseInt(process.env.PORT) + 1 || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

