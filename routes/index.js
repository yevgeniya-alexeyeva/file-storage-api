const express = require("express");
const router = express.Router();
const ctrls = require("../controllers/users");
// const { authenticate } = require("../middlewares");

router.post("/signup", express.json(), ctrls.addUser);

module.exports = router;
