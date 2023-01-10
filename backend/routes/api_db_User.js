// Import User Model
const {User} = require("../db_models.js");
 
// Get all Users
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.send(users ? users : {});
    } catch (err) {
        console.log(err);
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
        // console.log(user)
        res.send(user ? user : {"message":"There is no such user"});
    } catch (err) {
        console.log(err);
    }
}
 
// Create a new User
const createUser = async (req, res) => {
    try {
        await User.create(req.body);
        res.json({
            "message": "User Created"
        });
    } catch (err) {
        console.log(err);
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
    }
}
 
// Delete User by id
const deleteUser = async (req, res) => {
    try {
        await Product.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "User Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}


module.exports = {getUsers,getUserById,createUser,updateUser,deleteUser};