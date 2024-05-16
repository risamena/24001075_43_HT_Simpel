const getAllData = require("../controllers/c_jurnal");
const router = require("./dosen");

router.get("/artikel", getAllData);
