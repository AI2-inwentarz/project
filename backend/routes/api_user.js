const {User, UserDepartmentRole} = require("../db_models.js");
const {Department} = require("../db_models.js");

const { Op } = require("sequelize");

const {userHasAccessToDepartment} = require("../util.js");















// Get Department by id
const getDepartmentsForUser = async (req, res) => {
    try {
        if(!req.auth.user.id){return;}
        var userId = req.auth.user.id;
        var user = await User.findByPk(userId);
        // console.log(await user.getDepartments());
        // console.log(await user.getUserDepartmentRoles());
        var udrList = await user.getUserDepartmentRoles();
        // console.log(udrList[0]);
        // udrList.for
        var idArray = [];
        for await (const udr of udrList){
                idArray.push(udr.department_id);
        }
        
        
        // idArray.push(req.auth.user.id);
        const department = await Department.findAll({
            where: {
                [Op.or]:{owner_id:req.auth.user.id,id:idArray}
            }
        });
        
        res.send(department ? department : {"message":"No record found"});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// Get Department by id
const getRoomsForDepartment = async (req, res) => {
    try {
        if(!req.auth.user.id){res.sendStatus(401);return false;}
        if(!req.params.id){res.send({"message":"Id is needed in params"});return false;}
        // console.log(req.params.id);
        var userId = req.auth.user.id;
        var departmentId = req.params.id;
        // console.log(req.body);
        // console.log(req.params);
        // console.log(req);
        // console.log(await userHasAccessToDepartment(req.auth,departmentId));
        if(!await userHasAccessToDepartment(req.auth,departmentId)){res.sendStatus(403);return false;}
        // console.log(await userHasAccessToDepartment(req.auth,departmentId));
        var department = await Department.findByPk(departmentId);
        if(!department){res.json(department ? department : {"message":"No records found"});return false;}
        var rooms = await department.getRooms();

        
        res.send(rooms ? rooms : {"message":"No record found"});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// Get User by id
const getUserInfo = async (req, res) => {
    if(!req.auth.user.id){return;}
    var userId = req.auth.user.id;
    try {
        const user = await User.findOne({
            where: {
                id: userId
            }
        });
        var tempuser = user;
        tempuser.password = null;
        res.send(user ? user : {"message":"No record found"});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// Get User by id
const getDepartmentCategories = async (req, res) => {
    try {
        if(!req.auth.user.id){res.sendStatus(401);return false;}
        if(!req.params.id){res.send({"message":"Id is needed in params"});return false;}
        // console.log(req.params.id);
        var userId = req.auth.user.id;
        var departmentId = req.params.id;
        // console.log(req.body);
        // console.log(req.params);
        // console.log(req);
        // console.log(await userHasAccessToDepartment(req.auth,departmentId));
        if(!await userHasAccessToDepartment(req.auth,departmentId)){res.sendStatus(403);return false;}
        // console.log(await userHasAccessToDepartment(req.auth,departmentId));
        var department = await Department.findByPk(departmentId);
        if(!department){res.json(department ? department : {"message":"No records found"});return false;}
        var categories = await department.getItemCategories();

        
        res.send(categories ? categories : {"message":"No record found"});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// Get User by id
const getDepartmentItems = async (req, res) => {
    try {
        if(!req.auth.user.id){res.sendStatus(401);return false;}
        if(!req.params.id){res.send({"message":"Id is needed in params"});return false;}
        // console.log(req.params.id);
        var userId = req.auth.user.id;
        var departmentId = req.params.id;
        // console.log(req.body);
        // console.log(req.params);
        // console.log(req);
        // console.log(await userHasAccessToDepartment(req.auth,departmentId));
        if(!await userHasAccessToDepartment(req.auth,departmentId)){res.sendStatus(403);return false;}
        // console.log(await userHasAccessToDepartment(req.auth,departmentId));
        var department = await Department.findByPk(departmentId);
        if(!department){res.json(department ? department : {"message":"No records found"});return false;}
        var items = await department.getItems();

        
        res.send(items ? items : {"message":"No record found"});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// Get Department by id
const getContacts = async (req, res) => {
    try {
        if(!req.auth.user.id){return;}
        var userId = req.auth.user.id;
        var user = await User.findByPk(userId);
        // console.log(await user.getDepartments());
        // console.log(await user.getUserDepartmentRoles());
        var udrList = await user.getUserDepartmentRoles();
        // console.log(udrList[0]);
        // udrList.for
        var idArray = [];
        for await (const udr of udrList){
                idArray.push(udr.department_id);
        }
        
        
        // idArray.push(req.auth.user.id);
        const departments = await Department.findAll({
            where: {
                [Op.or]:{id:idArray}
            }
        });
        var userIdArray = [];
        for await (const department of departments){
            userIdArray.push(department.owner_id);
        }
        const users = await User.findAll({
            // include: [Department,UserDepartmentRole],
            attributes:["id","firstname","surname","email","role","job_title"],
            where: {
                [Op.or]:{role:{[Op.gt]: 0},id:userIdArray}
            }
        });
        // // var userIdArray = [];
        // for await (var user of users){
        //     // userIdArray.push(department.owner_id);
        //     var departmentwithaname = await Department.findOne({where:{owner_id:user.id}});
        //     console.log(departmentwithaname)
        //     user.department_name = departmentwithaname;
        // }

        var depardments = await Department.findAll({attributes:["name","owner_id"]});
        res.send({users,depardments} ? {users,depardments} : {"message":"No record found"});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const getDepartmentUsers = async (req, res) => {
    try {
        if(!req.auth.user.id){res.sendStatus(401);return false;}
        if(!req.params.id){res.send({"message":"Id is needed in params"});return false;}
        // console.log(req.params.id);
        var userId = req.auth.user.id;
        var departmentId = req.params.id;
        // console.log(req.body);
        // console.log(req.params);
        // console.log(req);
        // console.log(await userHasAccessToDepartment(req.auth,departmentId));
        if(!await userHasAccessToDepartment(req.auth,departmentId)){res.sendStatus(403);return false;}
        // console.log(await userHasAccessToDepartment(req.auth,departmentId));
        var department = await Department.findByPk(departmentId);
        var udr = await department.getUserDepartmentRoles({include:{model:User,attributes:["id","firstname","surname","email","role","job_title"]}});
        console.log(udr);
        if(!udr){res.json(udr ? udr : {"message":"No records found"});return false;}
        // var items = await department.getItems();

        
        res.send(udr ? udr : {"message":"No record found"});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const deleteDepartmentUser = async (req, res) => {
    try {
        if(!req.auth.user.id){res.sendStatus(401);return false;}
        if(!req.params.id){res.send({"message":"Id is needed in params"});return false;}
        if(!req.body.user_id){res.send({"message":"user_id is needed in body"});return false;}
        // console.log(req.params.id);
        var userId = req.auth.user.id;
        var departmentId = req.params.id;
        console.log(req.body);
        console.log(req.params);
        // console.log(req);
        // console.log(await userHasAccessToDepartment(req.auth,departmentId));
        if(!await userHasAccessToDepartment(req.auth,departmentId)){res.sendStatus(403);return false;}
        // console.log(await userHasAccessToDepartment(req.auth,departmentId));
        var department = await Department.findByPk(departmentId);
        if(department.owner_id!=userId){res.sendStatus(403);return false;}
        console.log(req.body.user_id);
        const result = await UserDepartmentRole.destroy({
            where: {
                user_id: req.body.user_id
            }
        });
        console.log(result);
        // var udr = await department.getUserDepartmentRoles({include:{model:User,attributes:["id","firstname","surname","email","role","job_title"]}});
        // console.log(udr);
        // if(!udr){res.json(udr ? udr : {"message":"No records found"});return false;}
        // var items = await department.getItems();

        
        res.send(result ? {"message":"One result deleted"} : {"message":"No record found"});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

module.exports = {
    getDepartmentsForUser,
    getRoomsForDepartment,
    getUserInfo,
    getDepartmentCategories,
    getDepartmentItems,
    getContacts,
    getDepartmentUsers,
    deleteDepartmentUser
};