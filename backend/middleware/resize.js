const sharp = require("sharp");

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${Math.round(
    Math.random() * 1e9
  )}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`../uploads/users/${req.file.filename}`);
  next();
};
exports.resizeCatPhoto = (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `category-${Math.round(
    Math.random() * 1e9
  )}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`../uploads/categories/${req.file.filename}`);
  next();
};

exports.resizePhotos = (req, res, next) => {
  req.body.images = [];
  if (!req.files) return next();
  req.files.map((file) => {
    file.filename = `product-${Math.round(
      Math.random() * 1e9
    )}-${Date.now()}.jpeg`;
    sharp(file.buffer)
      .resize(3000, 1300)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`../uploads/products/${file.filename}`);
  });
  next();
};
