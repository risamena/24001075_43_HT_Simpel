const client = require('../config/database');

async function getAllData() {
    const rawData = await client.query(`SELECT * FROM dosen ORDER BY dosen_id`);
    return rawData;
} 

async function getDataByID(dosen_id){
    const rawData = await client.query(`
            SELECT * FROM dosen WHERE dosen_id = $1`, [dosen_id]);
    return rawData;
}
async function insertDataDosen(dosen_id, nama_lengkap, fakultas, prodi, alamat){
    await client.query(`
            INSERT INTO dosen (dosen_id, nama_lengkap, fakultas, prodi, alamat)
            VALUES ($1, $2, $3, $4, $5)`, [
                dosen_id, nama_lengkap, fakultas, prodi, alamat
            ]);
}
async function updateDataDosen(nama_lengkap, fakultas, prodi, alamat, dosen_id){
    const rawData = await client.query(`
            UPDATE dosen SET nama_lengkap = $1, fakultas = $2, prodi = $3, alamat = $4
            WHERE dosen_id = $5 RETURNING *`, [nama_lengkap, fakultas, prodi, alamat, dosen_id]);
    return rawData;
}
async function deleteDataDosen(dosen_id){
    await client.query(`DELETE FROM dosen WHERE dosen_id = $1`, [dosen_id]);
}


module.exports = {getAllData, getDataByID, insertDataDosen, updateDataDosen, deleteDataDosen};