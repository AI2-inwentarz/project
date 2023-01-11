
const {User} = require("./db_models.js");

async function authIsAdmin(auth){
    if(auth && auth.user && auth.user.id){
        var user = await User.findOne({where:{id:auth.user.id}});
        if(!user){return false;}
        return user.role > 0;
    }else{return false;}


}

module.exports = {authIsAdmin};