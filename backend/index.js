const express = require('express');
const path = require('path');
var cors = require("cors");


const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


var apiRoute = require("./api_route.js");
app.use("/api", apiRoute);


//app.use(express.static(path.join(__dirname, 'build')));

//app.get('/', function (req, res) {
//  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
//});
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

app.listen(9000);