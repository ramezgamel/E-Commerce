const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Product = require("../model/Product");
const Coupon = require("../model/Coupon");
const factory = require("./factory");
const Cart = require("../model/Cart");

// url    POST    api/cart?cartId=
exports.addProductToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const { cartId } = req.query;
  const product = await Product.findById(productId);
  if (!product) throw new ApiError("Invalid product id", 404);
  if (product.countInStock < quantity) throw new ApiError("Out of Stock", 400);
  let cart;
  if (cartId) {
    cart = await Cart.findById(cartId);
    if (cart.readOnly) throw new ApiError("Can't update this cart", 400);
  }
  if (!cartId) {
    cart = await Cart.create({
      cartItems: [
        {
          product: product._id,
          quantity: 1,
          price: product.priceAfterDiscount
            ? product.priceAfterDiscount
            : product.price,
          shipping: product.shipping,
        },
      ],
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
        price: product.priceAfterDiscount
          ? product.priceAfterDiscount
          : product.price,
        shipping: product.shipping,
      });
    }
  }

  cart.totalPriceAfterDisCount = undefined;
  await cart.save();
  res.status(200).json(cart);
});
// url    GET     api/cart/:id
exports.getUserCart = factory.getOne(Cart, {
  path: "cartItems",
  populate: {
    path: "product",
  },
});
// url    DELETE  api/cart/:id
exports.clearCart = factory.deleteOne(Cart);
// url    DELETE  api/cart/:cartId/:itemId
exports.deleteItem = asyncHandler(async (req, res) => {
  const { productId, cartId } = req.params;
  const cart = await Cart.findById(cartId);
  if (!cart) throw new ApiError("There is no cart for this id", 404);
  cart.cartItems = cart.cartItems.filter(
    (item) => item.product.toString() !== productId.toString()
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
  const cart = await Cart.findById(req.params.cartId).populate(
    "cartItems.product"
  );
  if (!cart) throw new ApiError("No cart for this user");
  if (cart.isCoupon == true)
    throw new ApiError("You have a discount already", 400);
  cart.totalPriceAfterDisCount =
    cart.totalPrice - cart.totalPrice * (coupon.discount / 100).toFixed(2);
  cart.isCoupon = true;
  cart.coupon = coupon.discount;
  await cart.save();
  res.status(200).json({ data: cart });
});

// url    DEL    api/cart/:cartId/clearCoupon
exports.clearCoupon = asyncHandler(async (req, res) => {
  console.log("clearCoupon *************");
  const cart = await Cart.findById(req.params.cartId).populate(
    "cartItems.product"
  );
  if (!cart) throw new ApiError("No cart for this user");
  cart.totalPriceAfterDisCount = undefined;
  cart.coupon = undefined;
  cart.isCoupon = false;
  await cart.save();
  res.status(200).json({ data: cart });
});
