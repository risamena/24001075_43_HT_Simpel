const modelDosen = require('../models/m_dosen');
const m_trx = require('../models/m_transaction');
const client = require('../config/database');
const { raw } = require('express');

async function getCount(req, res) {
    try {
        m_trx.begin;
        const rawData = modelDosen.getAllData();
        const countDataDosen = (await rawData).rowCount;
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
        const rawData = modelDosen.getAllData();
        const data = (await rawData).rows;
        m_trx.commit;
        res.status(200).render('dosen/index', {data});
    } catch (error) {
        console.log(error);
        m_trx.rollback;
        res.status(500).render('500');
    }
}
async function getDataById(req, res){
    try {
        const dosen_id = req.params.dosen_id;
        m_trx.begin;
        const rawData = modelDosen.getDataByID(dosen_id);
        const data = (await rawData).rows[0];
        m_trx.commit;
        res.status(200).render('dosen/detail', {data});
    } catch (error) {
        console.log(error);
        m_trx.rollback;
        res.status(500).render('500');
    }
}
async function getEditor(req, res){
    try {
        const updateId = req.query.update_id;
        const dosen_id = updateId;
        m_trx.begin;
        const rawData = modelDosen.getDataByID(dosen_id);
        const data = (await rawData).rows[0];
        m_trx.commit;
        res.status(200).render('dosen/editor', {updateId, data});
    } catch (error) {
        console.log(error);
        m_trx.rollback;
        res.status(500).render('500');
    }
}
async function createData(req, res){
    try {
        const payload = req.body;
        const dosen_id = payload.dosen_id;
        const nama_lengkap = payload.nama_lengkap;
        const fakultas = payload.fakultas;
        const prodi = payload.prodi;
        const alamat = payload.alamat;

        m_trx.begin;
        modelDosen.insertDataDosen(dosen_id, nama_lengkap, fakultas, prodi, alamat);
        m_trx.commit;
        res.redirect('/data-dosen');
    } catch (error) {
        console.log(error);
        m_trx.rollback;
        res.status(500).render('500');
    }
}
async function updateData(req, res){
    try {
        const payload = req.body;
        const dosen_id = req.params.dosen_id;
        m_trx.begin;
        const rawOldData = modelDosen.getDataByID(dosen_id);
        const oldData = (await rawOldData).rows[0];

        const nama_lengkap = payload.nama_lengkap || oldData.nama_lengkap;
        const fakultas = payload.fakultas || oldData.fakultas;
        const prodi = payload.prodi || oldData.prodi;
        const alamat = payload.alamat || oldData.alamat;

        const newRawData = modelDosen.updateDataDosen(nama_lengkap, fakultas, prodi, alamat, dosen_id);
        const newData = (await newRawData).rows[0];
        m_trx.commit;
        res.redirect('/data-dosen')
    } catch (error) {
        console.log(error);
        m_trx.rollback;
        res.status(500).render('500');
    }
}

async function deleteData(req, res){
    try {
        const dosen_id = req.params.dosen_id;
        m_trx.begin;
        modelDosen.deleteDataDosen(dosen_id);
        m_trx.commit;
        res.redirect('/data-dosen');
    } catch (error) {
        console.log(error);
        m_trx.rollback;
        res.status(500).render('500');
    }
}

module.exports = {getCount, getAllData, getDataById, getEditor, createData, updateData, deleteData}