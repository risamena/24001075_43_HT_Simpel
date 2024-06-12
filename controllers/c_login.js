const model = require("../models/m_users");
const Joi = require("joi");
const Cryptojs = require("crypto-js");

async function login(req, res) {
  //1. ambil data user
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  const validasi = schema.validate(req.body);
  if (validasi.error !== undefined && validasi.error !== null) {
    return res.status(400).json({ message: validasi.error.details[0].message });
  }
  const { username, password } = req.body;
  const cekUser = await model.getUsers(username);

  if (cekUser.rowCount === 0) {
    return res.status(400).json({ message: "User Tidak Terdaftar" });
  }
  const encryptedPassword = Cryptojs.HmacSHA512(
    password,
    "user-simpel"
  ).toString();
  if (encryptedPassword !== cekUser.rows[0].password) {
    return res.status(400).json({ message: "Username atau Password salah" });
  }
  const token = {
    id: cekUser.rows[0].userId,
    username: cekUser.rows[0].username,
  };
  res.cookie("token", JSON.stringify(token), {
    maxAge: 10000000000,
    signed: true,
  });
  res.status(200).json({ message: "sukses" });
}

module.exports = login;