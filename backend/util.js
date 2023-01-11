
const {User, Department} = require("./db_models.js");

async function authIsAdmin(auth){
    if(auth && auth.user && auth.user.id){
        var user = await User.findOne({where:{id:auth.user.id}});
        if(!user){return false;}
        return user.role > 0;
    }else{return false;}

}






async function userHasAccessToDepartment(auth,department_id){
    department_id = parseInt(department_id);
    if(auth && auth.user && auth.user.id){
        var user = await User.findOne({where:{id:auth.user.id}});
        
        if(!user){return false;}
        var departments = await Department.findAll({where:{owner_id:auth.user.id}});
        var idArray = [];
        for await (const department of departments){
            idArray.push(department.id);
        }
        var udrList = await user.getUserDepartmentRoles();
        for await (const udr of udrList){
                idArray.push(udr.department_id);
        }
        // console.log("idArray.includes(department_id)",idArray.includes(department_id));
        // console.log("idArray",idArray);
        // console.log("department_id",department_id);
        if (idArray.includes(department_id)){return true;}
    }else{return false;}

}


module.exports = {authIsAdmin,userHasAccessToDepartment};