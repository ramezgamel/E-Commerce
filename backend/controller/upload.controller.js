const multer = require("multer");
const cloudinary = require("../middleware/cloudinary");
const upload = require("../middleware/upload");

exports.uploadSingle = [
  upload.single("image"),
  (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      res.status(400).send({ error: err.message });
    } else if (err) {
      res.status(500).send({ error: err });
    } else {
      next();
    }
  },
  cloudinary,
];

exports.uploadMulti = [
  upload.array("images", 10),
  (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      res.status(400).send({ error: err.message });
    } else if (err) {
      res.status(500).send({ error: err });
    } else {
      next();
    }
  },
  cloudinary,
];
