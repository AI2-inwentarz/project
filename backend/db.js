

const { Sequelize } = require('sequelize');
const config = require('./config');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(config.db_database, config.db_login, config.db_password, {
  host: config.db_host,
  dialect: config.db_type,
  define: {
    freezeTableName: true
  }
});




// require("./db_models.js")(sequelize);
// const {} = require("./db_models.js");



module.exports = {sequelize};