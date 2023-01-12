// Import Department Model
const {Department} = require("../db_models.js");
 
// Get all Departments
const getDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll();
        res.json(departments ? departments : {"message":"No records found"});
    } catch (err) {
        console.trace(err);
        res.sendStatus(400);
    }
}
 
// Get Department by id
const getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findOne({
            where: {
                id: req.params.id
            }
        });
        res.send(department ? department : {"message":"No record found"});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}
 
// Create a new Department
const createDepartment = async (req, res) => {
    try {
        var department = await Department.create(req.body);
        console.log(department);
        res.json({
            "message": "Record Created"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}
 
// Update Department by id
const updateDepartment = async (req, res) => {
    try {
        await Department.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Department Updated"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}
 
// Delete Department by id
const deleteDepartment = async (req, res) => {
    try {
        await Department.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Department Deleted"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}


module.exports = {getDepartments,getDepartmentById,createDepartment,updateDepartment,deleteDepartment};