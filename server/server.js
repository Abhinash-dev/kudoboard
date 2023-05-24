require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.use('/public', express.static('public'));
const kudo = require("./routers/routes"); 
// connect database
connectDB();

// initialize middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server up and running"));
app.use("/",kudo);

//app.use("/all", question);
// setting up port
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});