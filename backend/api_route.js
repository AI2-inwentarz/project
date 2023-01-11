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
  } else {
    return next(err);
  }
});


const {authUser} = require("./routes/api_auth.js");
router.post('/auth/authUser', authUser);

const {getUsers,getUserById,createUser,updateUser,deleteUser} = require("./routes/api_db_User.js");
router.get('/db/users', mustBeAdmin, getUsers);
router.get('/db/users/:id', mustBeAdmin,getUserById);
router.post('/db/users', mustBeAdmin,createUser);
router.put('/db/users/:id', mustBeAdmin,updateUser);
router.delete('/db/users/:id', mustBeAdmin,deleteUser);

router.get("/*", function(req, res, next) {
    res.send("API is working properly a, there is no such method on this url in api.");
});

module.exports = router;