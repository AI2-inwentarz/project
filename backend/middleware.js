const {authIsAdmin} = require("./util.js");
async function mustBeAdmin(req,res,next){

    if(!await authIsAdmin(req.auth)){res.sendStatus(403);return;}
    // res.sendStatus(401);
    // return false;
    // console.log(await authIsAdmin(req.auth));
    return next();
};

module.exports = {mustBeAdmin};