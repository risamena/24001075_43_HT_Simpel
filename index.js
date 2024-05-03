const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
const PORT = 4646

app.use(express.json());
app.use(express.urlencoded());

// config postgree: baiknya di file lain
const pg = require('pg');
const client = new pg.Client({
    host: 'satao.db.elephantsql.com',
    port: 5432,
    database: 'lxiumezd',
    user: 'lxiumezd',
    password: 'hHKxaeHHlZd8z0j_HCru83NzthBQls4A'
});
client.connect((error) => {
    console.log("Cannot connect to database: ", error);
});

// morgan
// internal server error handler
app.use( function(err, req, res, next){
    console.log(err);
    res.status(500).json({
        status: 'fail',
        errors: err.message
    });

});
// 404 handler
app.use((req, res, next) => {
    res.status(404).json({
        status: 'fail',
        errors: 'Maaf, halaman tidak ditemukan!'
    });
});

// server
app.listen(PORT, () => { console.log(`Server is running at Port ${PORT}`);});