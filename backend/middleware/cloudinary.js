const asyncHandler = require("express-async-handler");
const fs = require("fs");
const ApiError = require("../utils/apiError");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISEC,
  secure: true,
});

module.exports = asyncHandler(async (req, res) => {
  if (!req.file && !req.files) return;
  if (req.files) {
    req.files = req.files.map(async (file) =>
      cloudinary.uploader.upload(file.path, (error, result) =>
        fs.unlinkSync(file.path)
      )
    );
    const results = await Promise.all(req.files);
    if (!results) throw new ApiError("Error uploading images", 401);
    req.files.images = results.map((res) => res.secure_url);
    res.status(200).json({ success: true, data: req.files.images });
  } else {
    const result = await cloudinary.uploader.upload(
      req.file.path,
      (error, result) => fs.unlinkSync(req.file.path)
    );
    if (!result) throw new ApiError("Error uploading image", 401);
    req.file.url = result.secure_url;
    res.status(200).json({ success: true, data: req.file.url });
  }
});
