const pool = require("../config/database");

exports.getAllData = async () => {
  try {
    const result = await pool.query("SELECT * FROM jurnal");
    return result;
  } catch (error) {
    throw error;
  }
};