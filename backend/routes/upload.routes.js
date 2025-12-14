const express = require("express");
const { uploadSingle, uploadMulti } = require("../controller/upload.controller");

const router = express.Router();

router.post("/single", uploadSingle);
router.post("/multi", uploadMulti);

module.exports = router;
