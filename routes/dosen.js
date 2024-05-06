const express = require('express');
const router = express.Router();
const client = require('../config/database');

router.use(function timelog(req, res, next){
    console.log('Time: ', Date.now());
    next();
});

router.get('/', (req, res)=>{
    res.render('home/index');
});

// API - Read
router.get('/data-dosen', async (req, res)=>{

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

module.exports = router;