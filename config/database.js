const pg = require('pg');
const client = new pg.Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});
client.connect((error) => {
    if (error) {console.log('Error: ', error);} else {console.log('connected to database');};
});

module.exports = client;