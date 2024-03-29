var express = require("express");
const config = require("./config.js");
var router = express.Router();

const {mustBeAdmin,mustHaveAccess} = require("./middleware.js");

var { expressjwt: jwt } = require("express-jwt");

router.get("/", function(req, res, next) {
    res.send("API is working properly x");
});










router.use(
  jwt({
    secret: config.jwtsecret,
    algorithms: ["HS256"],
  }).unless({ path: [/^\/api\/auth/] })
);
router.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("UnauthorizedError, Your token is invalid, please login");
  } else if (err.name === "TokenExpiredError") {
    res.status(401).send("TokenExpiredError, Your token is invalid, please login");
  }
  else {
    return next(err);
  }
});




const {getUsers,getUserById,createUser,updateUser,deleteUser} = require("./routes/api_db_User.js");
router.get('/db/users', mustBeAdmin, getUsers);
router.get('/db/users/:id', mustBeAdmin,getUserById);
router.post('/db/users', mustBeAdmin,createUser);
router.put('/db/users/:id', mustBeAdmin,updateUser);
router.delete('/db/users/:id', mustBeAdmin,deleteUser);

const {getDepartments,getDepartmentById,createDepartment,updateDepartment,deleteDepartment} = require("./routes/api_db_Department.js");
router.get('/db/departments', mustBeAdmin, getDepartments);
router.get('/db/departments/:id', mustBeAdmin,getDepartmentById);
router.post('/db/departments', mustBeAdmin,createDepartment);
router.put('/db/departments/:id', mustBeAdmin,updateDepartment);
router.delete('/db/departments/:id', mustBeAdmin,deleteDepartment);

const {getUserDepartmentRoles,getUserDepartmentRoleById,createUserDepartmentRole,updateUserDepartmentRole,deleteUserDepartmentRole} = require("./routes/api_db_UserDepartmentRole.js");
router.get('/db/userDepartmentRoles', mustBeAdmin, getUserDepartmentRoles);
router.get('/db/userDepartmentRoles/:id', mustBeAdmin,getUserDepartmentRoleById);
router.post('/db/userDepartmentRoles', mustBeAdmin,createUserDepartmentRole);
router.put('/db/userDepartmentRoles/:id', mustBeAdmin,updateUserDepartmentRole);
router.delete('/db/userDepartmentRoles/:id', mustBeAdmin,deleteUserDepartmentRole);

const {getItemCategories,getItemCategoryById,createItemCategory,updateItemCategory,deleteItemCategory} = require("./routes/api_db_ItemCategory.js");
router.get('/db/itemCategories', mustBeAdmin, getItemCategories);
router.get('/db/itemCategories/:id', mustBeAdmin,getItemCategoryById);
router.post('/db/itemCategories', mustBeAdmin,createItemCategory);
router.put('/db/itemCategories/:id', mustBeAdmin,updateItemCategory);
router.delete('/db/itemCategories/:id', mustBeAdmin,deleteItemCategory);

const {getRooms,getRoomById,createRoom,updateRoom,deleteRoom} = require("./routes/api_db_Room.js");
router.get('/db/rooms', mustBeAdmin, getRooms);
router.get('/db/rooms/:id', mustBeAdmin,getRoomById);
router.post('/db/rooms', mustBeAdmin,createRoom);
router.put('/db/rooms/:id', mustBeAdmin,updateRoom);
router.delete('/db/rooms/:id', mustBeAdmin,deleteRoom);

const {getItems,getItemById,createItem,updateItem,deleteItem} = require("./routes/api_db_Item.js");
router.get('/db/items', mustBeAdmin, getItems);
router.get('/db/items/:id', mustBeAdmin,getItemById);
router.post('/db/items', mustBeAdmin,createItem);
router.put('/db/items/:id', mustBeAdmin,updateItem);
router.delete('/db/items/:id', mustBeAdmin,deleteItem);



const {authUser,registerUser} = require("./routes/api_auth.js");
router.post('/auth/authUser', authUser);
router.post('/auth/registerUser', registerUser);

const {
  getDepartmentsForUser,
  getRoomsForDepartment,
  getUserInfo,
  getDepartmentCategories,
  getDepartmentItems,
  getContacts,
  getDepartmentUsers,
  deleteDepartmentUser,
  createDepartmentUserDepartmentRole
} = require("./routes/api_user.js");
router.get('/user/getDepartmentsForUser', getDepartmentsForUser);
router.get('/user/getRoomsForDepartment/:id', getRoomsForDepartment);
router.get('/user/getUserInfo', getUserInfo);
router.get('/user/getDepartmentCategories/:id', getDepartmentCategories);
router.get('/user/getDepartmentItems/:id', getDepartmentItems);
router.get('/user/getDepartmentUsers/:id', getDepartmentUsers);
router.get('/user/getContacts', getContacts);
router.delete('/user/deleteDepartmentUser/:id', deleteDepartmentUser);
router.post('/user/createDepartmentUserDepartmentRole', createDepartmentUserDepartmentRole);

// router.get('/user/items/:id', mustHaveAccess,getItemById);
// router.post('/user/items', mustHaveAccess,createItem);
// router.put('/user/items/:id', mustHaveAccess,updateItem);
// router.delete('/user/items/:id', mustHaveAccess,deleteItem);





const {getUserItemCategories,getUserItemCategoryById,createUserItemCategory,updateUserItemCategory,deleteUserItemCategory} = require("./routes/api_user_ItemCategory.js");
router.get('/user/itemCategories',  getUserItemCategories);
router.get('/user/itemCategories/:id', getUserItemCategoryById);
router.post('/user/itemCategories', createUserItemCategory);
router.put('/user/itemCategories/:id', updateUserItemCategory);
router.delete('/user/itemCategories/:id', deleteUserItemCategory);

const {getUserRooms,getUserRoomById,createUserRoom,updateUserRoom,deleteUserRoom} = require("./routes/api_user_Room.js");
router.get('/user/rooms',  getUserRooms);
router.get('/user/rooms/:id', getUserRoomById);
router.post('/user/rooms', createUserRoom);
router.put('/user/rooms/:id', updateUserRoom);
router.delete('/user/rooms/:id', deleteUserRoom);

const {getUserItems,getUserItemById,createUserItem,updateUserItem,deleteUserItem} = require("./routes/api_user_Item.js");
router.get('/user/items',  getUserItems);
router.get('/user/items/:id', getUserItemById);
router.post('/user/items', createUserItem);
router.put('/user/items/:id', updateUserItem);
router.delete('/user/items/:id', deleteUserItem);





router.get("/*", function(req, res, next) {
    res.send("API is working properly a, there is no such method on this url in api.");
});

module.exports = router;