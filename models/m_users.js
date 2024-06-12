const client = require("../config/database");

async function getUsers(username) {
  const query = await client.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ]);
  return query;
}

async function registerUser(username, email, encryptedPassword) {
  const query = await client.query(
    `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`,
    [username, email, encryptedPassword]
  );
  return query;
}
module.exports = { registerUser, getUsers };
