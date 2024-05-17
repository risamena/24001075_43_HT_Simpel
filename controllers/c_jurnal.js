const getAllData = require('../models/m_jurnal');
const m_trx = require("../models/m_transaction");

async function getAllArticle(req, res) {
  try {
    m_trx.begin;
    const rawData = await getAllData();
    const data = rawData.rows;
    m_trx.commit;
    res.status(200).render("jurnal/index", { data });
  } catch (error) {
    console.log(error);
    m_trx.rollback;
    res.status(500).render("500");
  }
}

module.exports = getAllArticle;
