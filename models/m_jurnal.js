const pool = require("../config/database");

async function getAllData() {
  const result = await pool.query("SELECT * FROM jurnal");
  return result;
}

async function getDataJurnalById(jurnal_id) {
  const result = await pool.query(`SELECT * FROM jurnal WHERE jurnal_id=$1`,[jurnal_id]);
  return result;
}

async function createDataJurnal(judul_artikel,publisher,nama_jurnal,issn,tahun) {
  await pool.query(`
    INSERT INTO jurnal (judul_artikel,publisher,nama_jurnal,issn,tahun) VALUES ($1,$2,$3,$4,$5)
    `,[judul_artikel,publisher, nama_jurnal,issn,tahun]
  );
}



module.exports = {getAllData,getDataJurnalById,createDataJurnal};
