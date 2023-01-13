// Import User Model
const {User} = require("../db_models.js");
 
// Get all Users
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users ? users : {"message":"No records found"});
    } catch (err) {
        console.trace(err);
        res.sendStatus(500);
    }
}
 
// Get User by id
const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        res.send(user ? user : {"message":"No record found"});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
 
// Create a new User
const createUser = async (req, res) => {
    try {
        var user = await User.create(req.body);
        console.log(user);
        res.json({
            "message": "Record Created"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
 
// Update User by id
const updateUser = async (req, res) => {
    try {
        await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "User Updated"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
 
// Delete User by id
const deleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "User Deleted"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}


module.exports = {getUsers,getUserById,createUser,updateUser,deleteUser};