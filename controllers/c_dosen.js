const m_dosen = require('../models/m_dosen');
const m_trx = require('../models/m_transaction');

async function getCount(req, res) {
    try {
        m_trx.begin;
        const rawData = m_dosen.getAllData;
        const countDataDosen = rawData.rowCount;
        m_trx.commit;
        res.render('home/index', {countDataDosen});
    } catch (error) {
        console.log(error);
        m_trx.rollback;
        res.status(500).render('500');
    } 
}

async function getAllData(req, res){
    try {
        m_trx.begin;
        const rawData = m_dosen.getAllData;
        const data = rawData.rows;
        m_trx.commit;
        res.status(200).render('dosen/index', {data});
    } catch (error) {
        console.log(error);
        m_trx.rollback;
        res.status(500).render('500');
    }
}

module.exports = {getCount, getAllData}