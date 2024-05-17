const express = require('express');
const methodOverride = require('method-override');
const router = express.Router();
// const client = require('../config/database');
express().use(methodOverride('_method'));

router.use(function timelog(req, res, next){
    console.log('Time: ', Date.now());
    next();
});
// controller
const controllerDosen = require('../controllers/c_dosen');

// Home
router.get('/', controllerDosen.getCount);

// API - Read Data Dosen
router.get('/data-dosen', controllerDosen.getAllData);
// API - Read Data by ID
router.get('/data-dosen/detail/:dosen_id', controllerDosen.getDataById);

// API - Editor - Create
router.get('/data-dosen/editor', controllerDosen.getEditor);

// API - Create
router.post('/data-dosen/create', controllerDosen.createData);

// API - Update
router.post('/data-dosen/update/:dosen_id', controllerDosen.updateData);

// API - Delete
router.get('/data-dosen/delete/:dosen_id', controllerDosen.deleteData);

module.exports = router;