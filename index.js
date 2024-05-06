const express = require('express');
const app = express();
const PORT = process.env.PORT || 4646;

app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// router
const dosen = require('./routes/dosen');
app.use(dosen);

// morgan
const morgan = require('morgan');
app.use(morgan('dev'));
// 500 handler
app.use((err, req, res, next)=>{
    res.status(500).render('500')
});
// 404 handler
app.use((req, res, next) => {
    res.status(404).render('404');
});

// server
app.listen(PORT, () => { console.log(`Server is running at Port http://localhost:${PORT}`);});