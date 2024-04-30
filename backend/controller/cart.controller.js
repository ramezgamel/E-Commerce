const Cart = require("../model/Cart");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

exports.addProductToCart = asyncHandler(async (req, res) => {
  // no cart with userId
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = await Cart.create({});
  }
});
