const client = require("../config/database");

async function begin(){
    return await client.query('BEGIN');
}
async function commit(){
    return await client.query('COMMIT');
}
async function rollback(){
    return await client.query('ROLLBACK')
}
module.exports = {begin, commit, rollback}