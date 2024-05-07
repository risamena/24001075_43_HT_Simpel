const client = require('../config/database');

async function getAllData() {
    const rawData = await client.query(`SELECT * FROM dosen`);
    return rawData;
}


module.exports = {getAllData};