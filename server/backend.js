const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const {readCommand, postIntoTable, insertIntoTable, getTableNames, registerUser} = require("./CRUD.js")
const {sendCommand} = require("./sendCommand.js");


app.use(cors({origin: "*",}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/get-command",(req, res)=>{readCommand(req, res)})
app.get("/get-tableNames",(req, res)=>{getTableNames(req, res)})

app.post("/post-data",(req, res, next) => {postIntoTable(req, res)})
app.post("/insert-data", (req, res, next)=>{insertIntoTable(req, res)})
app.post("/send-command", (req, res, next)=>{sendCommand(req, res)})
app.post("/register", (req, res, next) =>{registerUser(email, password, res)})





var PORT = parseInt(process.env.PORT) + 1 || 3001;
app.listen(PORT, () => {
  console.log(`The server is listen to port ${PORT}`);
});

