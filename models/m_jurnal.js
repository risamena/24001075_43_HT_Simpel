const pool = require("../config/database");

async function getAllData() {
  const result = await pool.query("SELECT * FROM jurnal");
  return result;
}

async function getDataJurnalById(jurnal_id) {
  const result = await pool.query(`SELECT * FROM jurnal WHERE jurnal_id=$1`,[jurnal_id]);
  return result;
}


module.exports = {getAllData,getDataJurnalById};
