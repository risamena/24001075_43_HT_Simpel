const express = require("express");
const controllers_jurnal = require("../controllers/c_jurnal");
const router = express.Router();

router.get("/artikel", controllers_jurnal.getAllArticle);
router.get("/artikel/:jurnal_id", controllers_jurnal.getDataJurnalById);

module.exports = router;