const express = require('express');
const app = express();
const PORT = process.env.PORT || 4646;

app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// config postgree: baiknya di file lain
// const pg = require('pg');
// const client = new pg.Client({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DB_NAME,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD
// });
// client.connect((error) => {
//     if (error) {console.log('Error: ', error);} else {console.log('connected to database');};
// });

// router
const dosen = require('./routes/dosen');
app.use(dosen);

// morgan
const morgan = require('morgan');
app.use(morgan('dev'));
// internal server error handler 500
app.use((err, req, res, next)=>{
    res.status(500).render('500')
});
// 404 handler
app.use((req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     errors: 'Maaf, halaman tidak ditemukan!'
    // });
    res.status(404).render('404');
});

// server
app.listen(PORT, () => { console.log(`Server is running at Port http://localhost:${PORT}`);});