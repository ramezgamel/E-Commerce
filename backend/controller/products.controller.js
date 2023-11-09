const asyncHandler = require("express-async-handler");
const Product = require("../model/Product");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

// @desc    Create new product
// @route   POST /api/products/
// @access  admin
module.exports.createProduct = asyncHandler(async (req, res) => {
  const { name, category, brand, price, countInStock, description } = req.body;

  const { _id } = req.user;
  const newProduct = new Product({
    user: _id,
    name,
    category,
    brand,
    price,
    countInStock,
    description,
  });
  if (req.files) {
    req.files.map((image) =>
      newProduct.images.push("products/" + image.filename)
    );
  }
  const product = await newProduct.save();
  res.status(201).json(product);
});
// @desc    Get all products
// @route   GET /api/products/
// @access  All
module.exports.getProducts = asyncHandler(async (req, res) => {
  const countDocument = await Product.countDocuments();
  const features = new ApiFeatures(Product.find(), req.query)
    .sort()
    .search()
    .fields()
    .filter()
    .paginate(countDocument);
  const products = await features.query;
  res.status(200).json({
    totalPages: features.totalPages,
    page: features.page,
    limit: features.limit,
    result: products,
  });
});
// @desc    Get top products
// @route   GET /api/products/top
// @access  All
module.exports.getTopProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5);
  if (!products) throw new ApiError("No Products to show", 400);
  res.status(200).json(products);
});
// @desc    Get specific products
// @route   GET /api/products/:id
// @access  All
module.exports.getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) throw new ApiError("Invalid product id", 404);
  res.status(200).json(product);
});
// @desc    Delete specific products
// @route   DELETE /api/products/:id
// @access  Admin
module.exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.status(200).json({ status: "success", data: "product deleted" });
});
// @desc    Update specific products
// @route   PUT /api/products/:id
// @access  Admin
module.exports.updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id, role } = req.user;

  const unAvailable = ["rating", "user", "numReviews", "review"];
  const product = await Product.findById(id);
  if (!product) throw new ApiError("Invalid product id", 404);
  if (_id !== product.user && role !== "admin")
    throw new Error("Only creator can update");
  Object.keys(req.body).forEach((key) => {
    if (unAvailable.includes(key)) throw new ApiError("Forbidden field", 403);
    product[key] = req.body[key];
  });
  if (req.files) {
    product.images = [];
    req.files.map((image) => {
      product.images.push("products/" + image.filename);
    });
  }
  await product.save({ new: true });
  res.status(200).json(product);
});
// @desc    Create review to specific products
// @route   POST /api/products/:id/review
// @access  user
module.exports.createReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const product = await Product.findById(id);
  if (!product) throw new ApiError("Invalid product id", 404);

  alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );
  if (alreadyReviewed) throw new ApiError("Product already reviewed", 400);
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, review) => acc + review.rating, 0) /
    product.reviews.length;
  await product.save({ new: true });
  res.status(200).json(product);
});
