const {authIsAdmin,userHasAccessToDepartment} = require("./util.js");
async function mustBeAdmin(req,res,next){

    if(!await authIsAdmin(req.auth)){res.sendStatus(403);return;}
    // res.sendStatus(401);
    // return false;
    // console.log(await authIsAdmin(req.auth));
    return next();
};







async function mustHaveAccess(req,res,next){

    if(!req.auth.user.id){res.sendStatus(401);return false;}
    if(req.method=="GET"){if(!req.params.id){
        res.send({"message":"Id is needed in params"});return false;}
        var departmentId = req.params.id;
    }
    if(!departmentId){res.send({"message":"Id(of department) is needed in params"});return false;}
    console.log(departmentId);
    if(!await userHasAccessToDepartment(req.auth,departmentId)){res.sendStatus(403);return false;}
    // console.log(typeof req.method);
    
    // res.sendStatus(401);
    // return false;
    // console.log(await authIsAdmin(req.auth));
    return next();
};

module.exports = {mustBeAdmin,mustHaveAccess};