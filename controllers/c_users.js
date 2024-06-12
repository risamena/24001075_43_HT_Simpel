const model = require("../models/m_users");
const Cryptojs = require("crypto-js");

async function registerUser(req, res) {
  const { username, email, password } = req.body;
  // 1. cek user is exist
  const existUser = await model.getUsers(username);
  // 2. jika sudah terdafatar, beri response username sudah terdaftar
  if (existUser.rowCount > 0) {
    return res.status(401).json({ message: "User already exists" });
  }
  // 3. jika belum terdaftar lakukan encrypstion password
  const encryptedPassword = Cryptojs.HmacSHA512(
    password,
    "user-simpel"
  ).toString();
  console.log(password);
  console.log(encryptedPassword);
  //4. simpan data user baru
  await model.registerUser(username, email, encryptedPassword);
  res.status(200).json({ status: "sukses" });
}

module.exports = registerUser;
