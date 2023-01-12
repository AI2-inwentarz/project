// Import UserDepartmentRole Model
const {UserDepartmentRole} = require("../db_models.js");
 
// Get all UserDepartmentRoles
const getUserDepartmentRoles = async (req, res) => {
    try {
        const userDepartmentRoles = await UserDepartmentRole.findAll();
        res.json(userDepartmentRoles ? userDepartmentRoles : {"message":"No records found"});
    } catch (err) {
        console.trace(err);
        res.sendStatus(400);
    }
}
 
// Get UserDepartmentRole by id
const getUserDepartmentRoleById = async (req, res) => {
    try {
        const userDepartmentRole = await UserDepartmentRole.findOne({
            where: {
                id: req.params.id
            }
        });
        res.send(userDepartmentRole ? userDepartmentRole : {"message":"No record found"});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}
 
// Create a new UserDepartmentRole
const createUserDepartmentRole = async (req, res) => {
    try {
        var userDepartmentRole = await UserDepartmentRole.create(req.body);
        console.log(userDepartmentRole);
        res.json({
            "message": "Record Created"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}
 
// Update UserDepartmentRole by id
const updateUserDepartmentRole = async (req, res) => {
    try {
        await UserDepartmentRole.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "UserDepartmentRole Updated"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}
 
// Delete UserDepartmentRole by id
const deleteUserDepartmentRole = async (req, res) => {
    try {
        await UserDepartmentRole.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "UserDepartmentRole Deleted"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}


module.exports = {getUserDepartmentRoles,getUserDepartmentRoleById,createUserDepartmentRole,updateUserDepartmentRole,deleteUserDepartmentRole};