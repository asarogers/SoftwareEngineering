const express = require("express");//the server
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const {readFromTable, registerUser, queryData, loginUser, upload} = require("./CRUD.js")
const {sendCommand} = require("./sendCommand.js");


app.use(cors({origin: "*",}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/read-all",(req, res)=>{readFromTable(req, res)})
app.get("/get-data",(req, res)=>{queryData(req, res)})

app.post("/send-command", (req, res, next)=>{sendCommand(req, res)})
app.post("/register", (req, res, next) =>{registerUser(req, res)})
app.post("/login", (req, res, next) =>{loginUser(req, res)})
app.post("/upload-building", (req, res, next) =>{upload(req, res)})




var PORT = parseInt(process.env.PORT) + 1 || 3001;
app.listen(PORT, () => {
  console.log(`The server is listen to port ${PORT}`);
});

