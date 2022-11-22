var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send("API is working properly x");
});

router.get("/*", function(req, res, next) {
    res.send("API is working properly a");
});

module.exports = router;