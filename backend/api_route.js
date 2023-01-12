var express = require("express");
const config = require("./config.js");
var router = express.Router();

const {mustBeAdmin} = require("./middleware.js");

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


const {authUser,registerUser} = require("./routes/api_auth.js");
router.post('/auth/authUser', authUser);
router.post('/auth/registerUser', registerUser);

const {getDepartmentsForUser,getRoomsForDepartment,getUserInfo,getDepartmentCategories,getDepartmentItems,getContacts} = require("./routes/api_user.js");
router.get('/user/getDepartmentsForUser', getDepartmentsForUser);
router.get('/user/getRoomsForDepartment/:id', getRoomsForDepartment);
router.get('/user/getUserInfo', getUserInfo);
router.get('/user/getDepartmentCategories/:id', getDepartmentCategories);
router.get('/user/getDepartmentItems/:id', getDepartmentItems);
router.get('/user/getContacts', getContacts);

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

router.get("/*", function(req, res, next) {
    res.send("API is working properly a, there is no such method on this url in api.");
});

module.exports = router;