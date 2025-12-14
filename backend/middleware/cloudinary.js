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

module.exports = asyncHandler(async (req, res, next) => {
  if (!req.file && (!req.files || req.files.length === 0)) {
     return next(new ApiError("No files uploaded", 400));
  }

  if (req.files && req.files.length > 0) {
    const uploadPromises = req.files.map(async (file) => {
      try {
        const result = await cloudinary.uploader.upload(file.path);
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        return result.secure_url;
      } catch (error) {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        throw error;
      }
    });

    try {
      const results = await Promise.all(uploadPromises);
      res.status(200).json({ success: true, data: results });
    } catch (error) {
      throw new ApiError("Error uploading images", 500);
    }
  } else if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      res.status(200).json({ success: true, data: result.secure_url });
    } catch (error) {
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      throw new ApiError("Error uploading image", 500);
    }
  }
});
