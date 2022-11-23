const multer = require("multer");
const path = require("path");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/images")
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
})

const upload = multer({storage: fileStorage});
module.exports = upload