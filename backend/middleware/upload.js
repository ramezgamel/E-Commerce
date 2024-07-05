const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    file.filename = `${req.baseUrl.split("/api/")[1]}-${Math.round(
      Math.random() * 1e9
    )}-${Date.now()}.jpeg`;
    cb(null, file.filename);
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
