const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    switch (req.baseUrl) {
      case "/api/products":
        cb(null, "../uploads/products");
        break;

      default:
        cb(null, "../uploads");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});
const fileFilter = function (req, file, cb) {
  const fileTypes = /png|jpeg|jpg/;
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType) return cb(null, true);
  cb("Images Only");
};
module.exports = multer({
  storage,
  fileFilter,
  limits: 1000000,
});
