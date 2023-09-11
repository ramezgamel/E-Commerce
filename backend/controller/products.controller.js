const asyncHandler = require("express-async-handler");
const Product = require("../model/Product");
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
  const product = await newProduct.save();
  res.status(201).json(product);
});
module.exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});
module.exports.getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.status(200).json(product);
});
module.exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.status(200).json("Deleted");
});
module.exports.updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, category, brand, price, countInStock, description } = req.body;
  const { _id } = req.user;
  const unAvailable = ["rating", "user", "numReviews", "review"];
  const product = await Product.findById(id);
  if (_id !== product.user) throw new Error("Only creator can update");
  await product.save();
  res.status(200).json(product);
});
