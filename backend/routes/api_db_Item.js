// Import Item Model
const {Item} = require("../db_models.js");
 
// Get all Items
const getItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.json(items ? items : {"message":"No records found"});
    } catch (err) {
        console.trace(err);
        res.sendStatus(400);
    }
}
 
// Get Item by id
const getItemById = async (req, res) => {
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
const createItem = async (req, res) => {
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
const updateItem = async (req, res) => {
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
const deleteItem = async (req, res) => {
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


module.exports = {getItems,getItemById,createItem,updateItem,deleteItem};