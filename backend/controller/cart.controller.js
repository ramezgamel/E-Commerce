const Cart = require("../model/Cart");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Product = require("../model/Product");
const Coupon = require("../model/Coupon");
const factory = require("./factory");

// url    POST    api/cart?cartId=
exports.addProductToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const { cartId } = req.query;
  const product = await Product.findById(productId);
  let cart = await Cart.findById(cartId);
  if (!product) throw new ApiError("Invalid product id", 404);
  if (!cart) {
    cart = await Cart.create({
      cartItems: [{ product: product._id, quantity: 1, price: product.price }],
    });
  } else {
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product._id.toString() == productId
    );
    if (productIndex > -1) {
      if (quantity) {
        cart.cartItems[productIndex].quantity = quantity;
      } else {
        cart.cartItems[productIndex].quantity += 1;
      }
    } else {
      cart.cartItems.push({
        product: product._id,
        quantity: 1,
        price: product.price,
      });
    }
  }
  cart.totalPriceAfterDisCount = undefined;
  await cart.save();
  res.status(200).json(cart);
});
// url    GET     api/cart/:id
exports.getUserCart = factory.getOne(Cart);
// url    DELETE  api/cart/:id
exports.clearCart = factory.deleteOne(Cart);
// url    DELETE  api/cart/:cartId/:itemId
exports.deleteItem = asyncHandler(async (req, res) => {
  const { itemId, cartId } = req.params;
  const cart = await Cart.findById(cartId);
  if (!cart) throw new ApiError("There is no cart for this id", 404);
  cart.cartItems = cart.cartItems.filter(
    (item) => item._id.toString() !== itemId.toString()
  );
  await cart.save();
  res.status(200).json(cart);
});
// url    POST    api/cart/:cartId/applyCoupon
exports.applyCoupon = asyncHandler(async (req, res) => {
  const { couponName } = req.body;
  const coupon = await Coupon.findOne({
    name: couponName,
    expire: { $gt: Date.now() },
  });
  if (!coupon) throw new ApiError("Invalid coupon or expired", 404);
  const cart = await Cart.findById(req.params.cartId);
  if (!cart) throw new ApiError("No cart fort this user");
  cart.totalPriceAfterDisCount =
    cart.totalPrice - cart.totalPrice * (coupon.discount / 100).toFixed(2);
  await cart.save();
  res.status(200).json({ numOfCartItems: cart.cartItems.length, data: cart });
});
