const pool = require("../config/database");

async function getAllData() {
  const result = await pool.query("SELECT * FROM jurnal");
  return result;
}

module.exports = getAllData;
