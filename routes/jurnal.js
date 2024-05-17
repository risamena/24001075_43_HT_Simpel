const express = require("express");
const getAllData = require("../controllers/c_jurnal");
const router = express.Router();

router.get("/artikel", getAllData);

module.exports = router;