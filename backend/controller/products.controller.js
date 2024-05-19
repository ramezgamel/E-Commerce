const asyncHandler = require("express-async-handler");
const Product = require("../model/Product");
const ApiError = require("../utils/apiError");
const factory = require("./factory");

// @desc    Get products by category
// @route   GET /api/products/category
// @access  All
module.exports.getProducts = factory.getAll(Product, {
  path: "category",
  select: "name",
});
// @desc    Create new product
// @route   POST /api/products/
// @access  admin
module.exports.createProduct = factory.createOne(Product);

// @desc    Get specific products
// @route   GET /api/products/:id
// @access  All
module.exports.getProduct = factory.getOne(Product, {
  path: "category",
  select: "name",
});

// @desc    Delete specific products
// @route   DELETE /api/products/:id
// @access  Admin
module.exports.deleteProduct = factory.deleteOne(Product);

// @desc    Update specific products
// @route   PUT /api/products/:id
// @access  Admin
module.exports.updateProduct = factory.updateOne(Product);

// @desc    Get top products
// @route   GET /api/products/top
// @access  All
module.exports.getTopProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5);
  if (!products) throw new ApiError("No Products to show", 400);
  res.status(200).json(products);
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
