const {User} = require("../db_models.js");
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
        
        
        idArray.push(req.auth.user.id);
        const department = await Department.findAll({
            where: {
                owner_id:{[Op.or]:idArray}
            }
        });
        
        res.send(department ? department : {"message":"No record found"});
    } catch (err) {
        console.log(err);
    }
}

// Get Department by id
const getRoomsForDepartment = async (req, res) => {
    try {
        if(!req.auth.user.id){return;}
        var userId = req.auth.user.id;
        var departmentId = req.body.department_id;
        console.log(req.body);
        // console.log(req.params);
        console.log(await userHasAccessToDepartment(req.auth,departmentId));
        if(!await userHasAccessToDepartment(req.auth,departmentId)){res.sendStatus(403);return false;}
        // console.log(await userHasAccessToDepartment(req.auth,departmentId));
        var department = await Department.findByPk(departmentId);
        if(!department){res.json(department ? department : {"message":"No records found"});return false;}
        var rooms = await department.getRooms();

        
        res.send(rooms ? rooms : {"message":"No record found"});
    } catch (err) {
        console.log(err);
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
    }
}

module.exports = {getDepartmentsForUser,getRoomsForDepartment,getUserInfo};