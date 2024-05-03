const express = require('express');
const router = express.Router();

router.get('/', DosenController.addNewDosen);

module.exports = router;