// Import Room Model
const {Room} = require("../db_models.js");
const {userHasAccessToDepartment} = require("../util.js");
// Get all Rooms
const getUserRooms = async (req, res) => {
    try {
        const rooms = await Room.findAll();
        res.json(rooms ? rooms : {"message":"No records found"});
    } catch (err) {
        console.trace(err);
        res.sendStatus(500);
    }
}
 
// Get Room by id
const getUserRoomById = async (req, res) => {

    if(!req.auth.user.id){res.sendStatus(401);return false;}
    if(!req.params.id){res.send({"message":"Id is needed in params"});return false;}
    var roomcheck = await Room.findByPk(req.params.id);
    var departmentId = roomcheck.department_id;
    if(!departmentId){res.send({"message":"departmentId of record not found"});return false;}
    console.log(departmentId);
    if(!await userHasAccessToDepartment(req.auth,departmentId)){res.sendStatus(403);return false;}

    try {
        const room = await Room.findOne({
            where: {
                id: req.params.id
            }
        });
        res.send(room ? room : {"message":"No record found"});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
 
// Create a new Room
const createUserRoom = async (req, res) => {

    if(!req.auth.user.id){res.status(401).json({"message":"user is not authed"});return false;}
    // console.log(req.body);
    if(!req.body.department_id){res.status(400).send({"message":"department_id is needed in params"});return false;}
    // var itemcheck = await Item.findByPk(req.body.id);
    // console.log(req.body);
    var departmentId = req.body.department_id;
    if(!departmentId){res.status(404).send({"message":"departmentId of record not found"});return false;}
    console.log(departmentId);
    if(!await userHasAccessToDepartment(req.auth,departmentId)){res.status(403).send({"message":"You dont have access to this department"});return false;}

    try {
        var checkroom = await Room.findOne({where:{name:req.body.name}});
        if(checkroom){res.status(409).send({"message":"Room with this name already exists"});return false;}
        var room = await Room.create(req.body);
        console.log(room);
        res.json({
            "message": "Record Created"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
 
// Update Room by id
const updateUserRoom = async (req, res) => {

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
        await Room.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Room Updated"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
 
// Delete Room by id
const deleteUserRoom = async (req, res) => {

    if(!req.auth.user.id){res.sendStatus(401);return false;}
    if(!req.params.id){res.send({"message":"Id is needed in params"});return false;}
    var roomcheck = await Room.findByPk(req.params.id);
    var departmentId = roomcheck.department_id;
    if(!departmentId){res.send({"message":"departmentId of record not found"});return false;}
    console.log(departmentId);
    if(!await userHasAccessToDepartment(req.auth,departmentId)){res.sendStatus(403);return false;}

    try {
        await Room.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Room Deleted"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}


module.exports = {getUserRooms,getUserRoomById,createUserRoom,updateUserRoom,deleteUserRoom};