const express = require("express");
const registerUser = require("../controllers/c_users");
const login = require("../controllers/c_login");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);

module.exports = router;
