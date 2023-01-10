var express = require("express");
const config = require("./config.js");
var router = express.Router();

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



const {authUser} = require("./routes/api_auth.js");
router.post('/auth/authUser', authUser);

const {getUsers,getUserById,createUser,updateUser,deleteUser} = require("./routes/api_db_User.js");
router.get('/db/users', getUsers);
router.get('/db/users/:id', getUserById);
router.post('/db/users', createUser);
router.put('/db/users/:id', updateUser);
router.delete('/db/users/:id', deleteUser);

router.get("/*", function(req, res, next) {
    res.send("API is working properly a");
});

module.exports = router;