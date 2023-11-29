const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISEC,
  secure: true,
});

module.exports = asyncHandler(async (req, res, next) => {
  if (req.files) {
    req.files = req.files.map((file) => cloudinary.uploader.upload(file.path));
    const results = await Promise.all(req.files);
    console.log(results);
    if (!results) throw new ApiError("Error uploading images", 401);
    req.files.images = results.map((res) => res.secure_url);
  } else {
    const result = await cloudinary.uploader.upload(req.file.path);
    req.file.url = result.secure_url;
  }
  next();
});
