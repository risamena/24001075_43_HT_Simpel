const express = require('express');
const router = express.Router();
const client = require('../config/database');

router.use(function timelog(req, res, next){
    console.log('Time: ', Date.now());
    next();
});

// Landing Page
// router.get('/', DosenController.addNewDosen);
router.get('/', async(req, res)=>{
    try {
        await client.query('BEGIN');
        const rawData = await client.query(`SELECT * FROM dosen`);
        const countDataDosen = rawData.rowCount;
        await client.query('COMMIT');
        res.render('home/index', {countDataDosen});
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        res.status(500).render('500');
    }
});

// API - Read Data Dosen
router.get('/data-dosen', async (req, res)=>{
    try {
        await client.query('BEGIN');
        const rawData = await client.query(`SELECT * FROM dosen`);
        const data = rawData.rows;
        const count = rawData.rowCount;
        await client.query('COMMIT');
        res.status(200).json({data, count}); //ganti ke VIEW
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
        res.status(200).json({data}); //ganti ke VIEW
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        res.status(500).render('500');
    }
});


// API - Create - [Pindahkan sesuai MVC]
router.post('/data-dosen', async (req, res)=>{
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
        res.status(200).send('success')
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        res.status(500).render('500');
    }   
});

// API - Update - Masih Error(Page Not Found)
router.put('data-dosen/update/:dosen_id', async (req, res)=>{
    try {
        const payload = req.body;
        const dosen_id = req.params.dosen_id;
        // const dosen_id = payload.dosen_id;
        await client.query('BEGIN');
        const rawOldData = await client.query(`
            SELECT * FROM dosen WHERE dosen_id = $1`,[dosen_id]);
        const oldData = rawOldData.rows[0];
        let nama_lengkap = oldData.nama_lengkap;
        let fakultas = oldData.fakultas;
        let prodi = oldData.prodi;
        let alamat = oldData.alamat;

        nama_lengkap = payload.nama_lengkap;
        fakultas = payload.fakultas;
        prodi = payload.prodi;
        alamat = payload.alamat;

        const newRawData = await client.query(`
            UPDATE dosen set nama_lengkap = $1, fakultas = $2, prodi = $3, alamat = $4
            WHERE dosen_id = $5 RETURNING *`, [
                nama_lengkap, fakultas, prodi, alamat, dosen_id
            ]);
        const newData = newRawData.rows[0];
        await client.query('COMMIT');
        res.status(200).json({data: newData});
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        res.status(500).render('500');
    }
});

// delete
router.delete('/data-dosen/delete/:dosen_id', async (req, res) => {
    await client.query('BEGIN');
    try {
        const dosen_id = req.params.dosen_id;
        await client.query(`DELETE FROM dosen WHERE dosen_id = $1`, [dosen_id]);
        await client.query('COMMIT');
        res.status(200).json({dosen_id});
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        res.status(500).render('500');
    }
});
module.exports = router;