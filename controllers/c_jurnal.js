const modelJurnal = require('../models/m_jurnal');
const m_trx = require("../models/m_transaction");

async function getAllArticle(req, res) {
  try {
    m_trx.begin;
    const rawData = await modelJurnal.getAllData();
    const data = rawData.rows;
    m_trx.commit;
    res.status(200).render("jurnal/index", { data });
  } catch (error) {
    console.log(error);
    m_trx.rollback;
    res.status(500).render("500");
  }
}

async function getDataJurnalById(req, res){
  try {
      const jurnal_id = req.params.jurnal_id;
      m_trx.begin;
      const rawData = modelJurnal.getDataJurnalById(jurnal_id);
      const data = (await rawData).rows[0];
      m_trx.commit;
      res.status(200).render('jurnal/detail', {data});
  } catch (error) {
      console.log(error);
      m_trx.rollback;
      res.status(500).render('500');
  }
}

// buat function async tambah data artikel
async function createDataJurnal(req, res){
  try {
      const payload = req.body;
      const judul_artikel = payload.judul_artikel;
      const publisher = payload.publisher;
      const nama_jurnal = payload.nama_jurnal;
      const issn = payload.issn;
      const tahun = payload.tahun;

      m_trx.begin;
      modelJurnal.createDataJurnal(judul_artikel,publisher,nama_jurnal,issn,tahun);
      m_trx.commit;
      res.redirect('/data-dosen');
  } catch (error) {
      console.log(error);
      m_trx.rollback;
      res.status(500).render('500');
  }
}
// judul_artikel
// varchar
// publisher
// varchar
// nama_jurnal
// varchar
// issn
// varchar
// tahun
// integer
// async function createDataArticle(req, res){
//   try {
//       const payload = req.body;
//       const judul_artikel = payload.judul_artikel;
//       const publisher = payload.publisher;
//       const fakultas = payload.nama_jurnal;
//       const prodi = payload.prodi;
//       const alamat = payload.alamat;

//       m_trx.begin;
//       modelDosen.insertDataDosen(dosen_id, nama_lengkap, fakultas, prodi, alamat);
//       m_trx.commit;
//       res.redirect('/data-dosen');
//   } catch (error) {
//       console.log(error);
//       m_trx.rollback;
//       res.status(500).render('500');
//   }
// }

module.exports = {getAllArticle,getDataJurnalById,createDataJurnal};
