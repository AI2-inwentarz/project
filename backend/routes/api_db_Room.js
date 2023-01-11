// Import Room Model
const {Room} = require("../db_models.js");
 
// Get all Rooms
const getRooms = async (req, res) => {
    try {
        const rooms = await Room.findAll();
        res.json(rooms ? rooms : {"message":"No records found"});
    } catch (err) {
        console.trace(err);
        res.sendStatus(400);
    }
}
 
// Get Room by id
const getRoomById = async (req, res) => {
    try {
        const room = await Room.findOne({
            where: {
                id: req.params.id
            }
        });
        res.send(room ? room : {"message":"No record found"});
    } catch (err) {
        console.log(err);
    }
}
 
// Create a new Room
const createRoom = async (req, res) => {
    try {
        var room = await Room.create(req.body);
        console.log(room);
        res.json({
            "message": "Record Created"
        });
    } catch (err) {
        console.log(err);
    }
}
 
// Update Room by id
const updateRoom = async (req, res) => {
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
    }
}
 
// Delete Room by id
const deleteRoom = async (req, res) => {
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
    }
}


module.exports = {getRooms,getRoomById,createRoom,updateRoom,deleteRoom};