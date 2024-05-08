const client = require('../config/database');

async function getAllData() {
    const rawData = await client.query(`SELECT * FROM dosen`);
    return rawData;
} 

async function getDataByID(){
    const rawData = await client.query(`
            SELECT * FROM dosen WHERE dosen_id = $1`, [dosen_id]);
    return rawData;
}


module.exports = {getAllData, getDataByID};