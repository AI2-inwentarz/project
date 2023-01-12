// Import Item Model
const {Item} = require("../db_models.js");
const {userHasAccessToDepartment} = require("../util.js");
// Get all Items
const getUserItems = async (req, res) => {
    


    try {
        const items = await Item.findAll();
        res.json(items ? items : {"message":"No records found"});
    } catch (err) {
        console.trace(err);
        res.sendStatus(400);
    }
}
 
// Get Item by id
const getUserItemById = async (req, res) => {
    
    if(!req.auth.user.id){res.sendStatus(401);return false;}
    if(!req.params.id){res.send({"message":"Id is needed in params"});return false;}
    var itemcheck = await Item.findByPk(req.params.id);
    var departmentId = itemcheck.department_id;
    if(!departmentId){res.send({"message":"departmentId of record not found"});return false;}
    console.log(departmentId);
    if(!await userHasAccessToDepartment(req.auth,departmentId)){res.sendStatus(403);return false;}

    try {
        const item = await Item.findOne({
            where: {
                id: req.params.id
            }
        });
        res.send(item ? item : {"message":"No record found"});
    } catch (err) {
        console.log(err);
    }
}
 
// Create a new Item
const createUserItem = async (req, res) => {

    if(!req.auth.user.id){res.sendStatus(401);return false;}
    // console.log(req.body);
    if(!req.body.department_id){res.send({"message":"department_id is needed in params"});return false;}
    // var itemcheck = await Item.findByPk(req.body.id);
    // console.log(req.body);
    var departmentId = req.body.department_id;
    if(!departmentId){res.send({"message":"departmentId of record not found"});return false;}
    console.log(departmentId);
    if(!await userHasAccessToDepartment(req.auth,departmentId)){res.sendStatus(403);return false;}

    try {
        var item = await Item.create(req.body);
        console.log(item);
        res.json({
            "message": "Record Created"
        });
    } catch (err) {
        console.log(err);
    }
}
 
// Update Item by id
const updateUserItem = async (req, res) => {
    try {
        await Item.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Item Updated"
        });
    } catch (err) {
        console.log(err);
    }
}
 
// Delete Item by id
const deleteUserItem = async (req, res) => {
    try {
        await Item.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Item Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}


module.exports = {getUserItems,getUserItemById,createUserItem,updateUserItem,deleteUserItem};