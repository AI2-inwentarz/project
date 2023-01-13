// Import User Model
const {User} = require("../db_models.js");
const config = require("../config.js");
const bcrypt = require('bcrypt');
 
// Get all Users
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.send(users ? users : {});
    } catch (err) {
        console.log(err);
    }
}
 





var jwt = require('jsonwebtoken');






// Get User by id
const authUser = async (req, res) => {
    try {
        // console.log(req.body);
        const user = await User.findOne({
            where: {
                login: req.body.login
            }
        });
        if(!user){res.json({"message":"Bad username"});return false;}
        if(user && bcrypt.compareSync(req.body.password, user.password)){
            var data = {
                "user":{"id":user.id,"role":user.role}
            };
            var token = jwt.sign(data, config.jwtsecret, { expiresIn: 60 * 60 });
            console.log(user,token);
            res.json(token ? {"token":token} : {"message":"Error generating token"});
        }else{
            res.json({"message":"Bad password"});
            // res.sendStatus(401);
            return false;
            // res.json();
        }
    } catch (err) {
        res.sendStatus(500);
        console.log(err);
    }
}
 
// Create a new User
const registerUser = async (req, res) => {
    try {
        console.log(req.body);
        if(!req || !req.body || !req.body.login){res.json({"message":"Login is required"});return;}
        if(!req || !req.body || !req.body.email){res.json({"message":"Email is required"});return;}
        if(!req || !req.body || !req.body.password){res.json({"message":"Password is required"});return;}
        if(await User.findOne({where:{login:req.body.login}})){res.json({"message":"Login is taken"});return;}
        if(await User.findOne({where:{email:req.body.email}})){res.json({"message":"Email is taken"});return;}

        const salt = await bcrypt.genSaltSync(12);
        var hashedpassword = bcrypt.hashSync(req.body.password, salt);

        var userParams = req.body;
        userParams.password = hashedpassword;
        userParams.role = 0;

        const user = await User.create(userParams);

        // await User.create(req.body);
        if(user){res.json({"message": "User Created"});}else{res.json({"message": "Error durning creating user"});}
    } catch (err) {
        res.sendStatus(500);
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
        res.sendStatus(500);
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
        res.sendStatus(500);
        console.log(err);
    }
}


module.exports = {authUser,registerUser};