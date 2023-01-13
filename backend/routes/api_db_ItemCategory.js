// Import ItemCategory Model
const {ItemCategory} = require("../db_models.js");
 
// Get all ItemCategorys
const getItemCategories = async (req, res) => {
    try {
        const itemCategorys = await ItemCategory.findAll();
        res.json(itemCategorys ? itemCategorys : {"message":"No records found"});
    } catch (err) {
        console.trace(err);
        res.sendStatus(500);
    }
}
 
// Get ItemCategory by id
const getItemCategoryById = async (req, res) => {
    try {
        const itemCategory = await ItemCategory.findOne({
            where: {
                id: req.params.id
            }
        });
        res.send(itemCategory ? itemCategory : {"message":"No record found"});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
 
// Create a new ItemCategory
const createItemCategory = async (req, res) => {
    try {
        var itemCategory = await ItemCategory.create(req.body);
        console.log(itemCategory);
        res.json({
            "message": "Record Created"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
 
// Update ItemCategory by id
const updateItemCategory = async (req, res) => {
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
        res.sendStatus(500);
    }
}
 
// Delete ItemCategory by id
const deleteItemCategory = async (req, res) => {
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
        res.sendStatus(500);
    }
}


module.exports = {getItemCategories,getItemCategoryById,createItemCategory,updateItemCategory,deleteItemCategory};