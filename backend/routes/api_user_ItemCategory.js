// Import ItemCategory Model
const {ItemCategory} = require("../db_models.js");
const {userHasAccessToDepartment} = require("../util.js");
// Get all ItemCategorys
const getUserItemCategories = async (req, res) => {
    try {
        const itemCategorys = await ItemCategory.findAll();
        res.json(itemCategorys ? itemCategorys : {"message":"No records found"});
    } catch (err) {
        console.trace(err);
        res.sendStatus(400);
    }
}
 
// Get ItemCategory by id
const getUserItemCategoryById = async (req, res) => {

    if(!req.auth.user.id){res.sendStatus(401);return false;}
    if(!req.params.id){res.send({"message":"Id is needed in params"});return false;}
    var itemcheck = await ItemCategory.findByPk(req.params.id);
    var departmentId = itemcheck.department_id;
    if(!departmentId){res.send({"message":"departmentId of record not found"});return false;}
    console.log(departmentId);
    if(!await userHasAccessToDepartment(req.auth,departmentId)){res.sendStatus(403);return false;}

    try {
        const itemCategory = await ItemCategory.findOne({
            where: {
                id: req.params.id
            }
        });
        res.send(itemCategory ? itemCategory : {"message":"No record found"});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}
 
// Create a new ItemCategory
const createUserItemCategory = async (req, res) => {

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
        var itemCategory = await ItemCategory.create(req.body);
        console.log(itemCategory);
        res.json({
            "message": "Record Created"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}
 
// Update ItemCategory by id
const updateUserItemCategory = async (req, res) => {

    if(!req.auth.user.id){res.sendStatus(401);return false;}
    if(!req.params.id){res.sendStatus(401);return false;}
    if(req.body.id && (req.body.id != req.params.id)){res.sendStatus(401);return false;}
    // console.log(req.body);
    if(!req.body.department_id){res.send({"message":"department_id is needed in params"});return false;}
    // var itemcheck = await Item.findByPk(req.body.id);
    // console.log(req.body);
    var departmentId = req.body.department_id;
    if(!departmentId){res.send({"message":"departmentId of record not found"});return false;}
    console.log(departmentId);
    if(!await userHasAccessToDepartment(req.auth,departmentId)){res.sendStatus(403);return false;}

    try {
        await ItemCategory.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "ItemCategory Updated"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}
 
// Delete ItemCategory by id
const deleteUserItemCategory = async (req, res) => {

    if(!req.auth.user.id){res.sendStatus(401);return false;}
    if(!req.params.id){res.send({"message":"Id is needed in params"});return false;}
    var itemcheck = await ItemCategory.findByPk(req.params.id);
    var departmentId = itemcheck.department_id;
    if(!departmentId){res.send({"message":"departmentId of record not found"});return false;}
    console.log(departmentId);
    if(!await userHasAccessToDepartment(req.auth,departmentId)){res.sendStatus(403);return false;}

    try {
        await ItemCategory.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "ItemCategory Deleted"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}


module.exports = {getUserItemCategories,getUserItemCategoryById,createUserItemCategory,updateUserItemCategory,deleteUserItemCategory};