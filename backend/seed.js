const config = require("./config");
const { User } = require("./db_models");
const {sequelize} = require("./db.js");

async function ShouldLoadExampleData(){

    try{
    var users = await User.findAndCountAll();
    }catch(err){return true;}
    console.log(users.count);
    if(users.count==0 && config.seedIfEmpty){
        return true;
    }
    else{return false;}
    
}







async function LoadExampleData(){

    const fs = require('fs');

    try {
        const data = fs.readFileSync('./seed.sql', 'utf8');
        // console.log(data);
        const [results, metadata] = await sequelize.query(data);
        console.log(results);
    } catch (err) {
        console.error(err);
    }
    
    
}

module.exports = {ShouldLoadExampleData,LoadExampleData};