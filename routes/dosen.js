const express = require('express');
const methodOverride = require('method-override');
const router = express.Router();
const client = require('../config/database');
express().use(methodOverride('_method'));

router.use(function timelog(req, res, next){
    console.log('Time: ', Date.now());
    next();
});
// controller
const controllerDosen = require('../controllers/c_dosen');


// Landing Page
router.get('/', controllerDosen.getCount);
// router.get('/', async(req, res)=>{
//     try {
//         await client.query('BEGIN');
//         const rawData = await client.query(`SELECT * FROM dosen`);
//         const countDataDosen = rawData.rowCount;
//         await client.query('COMMIT');
//         res.render('home/index', {countDataDosen});
//     } catch (error) {
//         console.log(error);
//         await client.query('ROLLBACK');
//         res.status(500).render('500');
//     } 
// });

// API - Read Data Dosen
// router.get('/data-dosen', c_dosen.getAllData);
router.get('/data-dosen', async (req, res)=>{
    try {
        await client.query('BEGIN');
        const rawData = await client.query(`SELECT * FROM dosen`);
        const data = rawData.rows;
        const count = rawData.rowCount;
        await client.query('COMMIT');
        res.status(200).render('dosen/index', {data});
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        res.status(500).render('500');
    }
});

router.get('/data-dosen/detail/:dosen_id', async (req, res)=>{
    try {
        const dosen_id = req.params.dosen_id;
        await client.query('BEGIN');
        const rawData = await client.query(`
            SELECT * FROM dosen WHERE dosen_id = $1`, [dosen_id]);
        const data = rawData.rows[0];
        await client.query('COMMIT');
        res.status(200).render('dosen/detail', {data});
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        res.status(500).render('500');
    }
});

// API - Editor - Create
router.get('/data-dosen/editor', async (req, res) => {
    const updateId = req.query.update_id;
    try {
        const dosen_id = updateId;
        await client.query('BEGIN');
        const rawData = await client.query(`
            SELECT * FROM dosen WHERE dosen_id = $1`, [dosen_id]);
        const data = rawData.rows[0];
        await client.query('COMMIT');
        res.status(200).render('dosen/editor', {updateId, data});
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        res.status(500).render('500');
    }
});

// API - Create
router.post('/data-dosen/create', async (req, res)=>{
    try {
        const payload = req.body;
        const dosen_id = payload.dosen_id;
        const nama_lengkap = payload.nama_lengkap;
        const fakultas = payload.fakultas;
        const prodi = payload.prodi;
        const alamat = payload.alamat;

        await client.query('BEGIN');
        await client.query(`
            INSERT INTO dosen (dosen_id, nama_lengkap, fakultas, prodi, alamat)
            VALUES ($1, $2, $3, $4, $5)`, [
                dosen_id, nama_lengkap, fakultas, prodi, alamat
            ]);
        await client.query('COMMIT');
        res.redirect('/data-dosen');
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        res.status(500).render('500');
    }   
});

// API - Update
router.post('/data-dosen/update/:dosen_id', async (req, res)=>{
    try {
        const payload = req.body;
        const dosen_id = req.params.dosen_id;
        await client.query('BEGIN');
        const rawOldData = await client.query(`
            SELECT * FROM dosen WHERE dosen_id = $1`,[dosen_id]);
        const oldData = rawOldData.rows[0];

        const nama_lengkap = payload.nama_lengkap || oldData.nama_lengkap;
        const fakultas = payload.fakultas || oldData.fakultas;
        const prodi = payload.prodi || oldData.prodi;
        const alamat = payload.alamat || oldData.alamat;

        const newRawData = await client.query(`
            UPDATE dosen SET nama_lengkap = $1, fakultas = $2, prodi = $3, alamat = $4
            WHERE dosen_id = $5 RETURNING *`, [nama_lengkap, fakultas, prodi, alamat, dosen_id]);
        const newData = newRawData.rows[0];
        await client.query('COMMIT');
        res.redirect('/data-dosen')
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        res.status(500).render('500');
    }
});

// API - Delete
router.get('/data-dosen/delete/:dosen_id', async (req, res) => {
    await client.query('BEGIN');
    try {
        const dosen_id = req.params.dosen_id;
        await client.query(`DELETE FROM dosen WHERE dosen_id = $1`, [dosen_id]);
        await client.query('COMMIT');
        res.redirect('/data-dosen');
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        res.status(500).render('500');
    }
});
module.exports = router;