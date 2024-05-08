const express = require('express');
const app = express();
const PORT = process.env.PORT || 4646;
app.locals.baseURL = `http://localhost:${PORT}`;
// app.locals.baseURL = `http://24001075-43-ht-simpel.ap-1.evennode.com`;

app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// router
const dosen = require('./routes/dosen');
app.use(dosen);

// morgan
const morgan = require('morgan');
const c_morgan = require('./controllers/c_morgan');
app.use(morgan('dev'));
app.use(c_morgan.ise);
app.use(c_morgan.pnf);

// server
app.listen(PORT, () => { console.log(`Server is running at Port http://localhost:${PORT}`);});