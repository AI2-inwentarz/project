// Import Item Model
const {Item, ItemCategory, Room} = require("../db_models.js");
const {userHasAccessToDepartment} = require("../util.js");
// Get all Items
const getUserItems = async (req, res) => {
    


    try {
        const items = await Item.findAll();
        res.json(items ? items : {"message":"No records found"});
    } catch (err) {
        console.trace(err);
        res.sendStatus(500);
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
        res.sendStatus(500);
    }
}
 
// Create a new Item
const createUserItem = async (req, res) => {

    if(!req.auth.user.id){res.sendStatus(401);return false;}
    // console.log(req.body);
    if(!req.body.department_id){res.send({"message":"department_id is needed in params"});return false;}
    var itemcategorycheck = await ItemCategory.findByPk(req.body.category_id);
    if(!itemcategorycheck||itemcategorycheck.department_id !=req.body.department_id){res.sendStatus(403);return false;}
    var roomcheck = await Room.findByPk(req.body.room_id);
    if(!roomcheck||roomcheck.department_id !=req.body.department_id){res.sendStatus(403);return false;}
    console.log(req.body);
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
        res.sendStatus(500);
    }
}
 
// Update Item by id
const updateUserItem = async (req, res) => {

    if(!req.auth.user.id){res.sendStatus(401);return false;}
    if(!req.params.id){res.sendStatus(401);return false;}
    if(req.body.id && (req.body.id != req.params.id)){res.sendStatus(401);return false;}
    // var itemcheck = await ItemCategory.findByPk(req.body.req.params.id);
    // if(!itemcheck||itemcheck.id !=req.body.department_id){res.sendStatus(403);return false;}
    console.log(req.body);
    if(!req.body.department_id){res.send({"message":"department_id is needed in params"});return false;}
    var itemcategorycheck = await ItemCategory.findByPk(req.body.category_id);
    if(!itemcategorycheck||itemcategorycheck.department_id !=req.body.department_id){res.sendStatus(403);return false;}
    var roomcheck = await Room.findByPk(req.body.room_id);
    if(!roomcheck||roomcheck.department_id !=req.body.department_id){res.sendStatus(403);return false;}
    console.log(req.body);
    var departmentId = req.body.department_id;
    if(!departmentId){res.send({"message":"departmentId of record not found"});return false;}
    console.log(departmentId);
    if(!await userHasAccessToDepartment(req.auth,departmentId)){res.sendStatus(403);return false;}

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
        res.sendStatus(500);
    }
}
 
// Delete Item by id
const deleteUserItem = async (req, res) => {

    if(!req.auth.user.id){res.sendStatus(401);return false;}
    if(!req.params.id){res.send({"message":"Id is needed in params"});return false;}
    var itemcheck = await Item.findByPk(req.params.id);
    var departmentId = itemcheck.department_id;
    if(!departmentId){res.send({"message":"departmentId of record not found"});return false;}
    console.log(departmentId);
    if(!await userHasAccessToDepartment(req.auth,departmentId)){res.sendStatus(403);return false;}

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
        res.sendStatus(500);
    }
}


module.exports = {getUserItems,getUserItemById,createUserItem,updateUserItem,deleteUserItem};