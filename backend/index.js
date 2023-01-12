const path = require('path');

const fs = require('fs')
try {
  if (!fs.existsSync("./config.js")) {
    console.error("config.js does not exist please raname config.js.templeate and fill details");
    return;
  }
}catch{}












const {sequelize} = require("./db.js");
const {Users} = require("./db_models.js");
(async function() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  // await sequelize.sync({ force: true });
  // if(true){require("./load_example_data.js");}
})();
const {ShouldLoadExampleData,LoadExampleData} = require("./seed.js");
(async () => {
  // await sequelize.sync({ force: true });
  if(await ShouldLoadExampleData()){await LoadExampleData();};
})();

const express = require('express');
var cors = require("cors");


const app = express();

app.use(cors({origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const {xss} = require("express-xss-sanitizer");
app.use(xss());

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





