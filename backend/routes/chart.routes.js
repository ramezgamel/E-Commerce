const router = require("express").Router();
const { protect, restrictTo } = require("../middleware/auth.middleware");
const asyncHandler = require("express-async-handler");
const Product = require("../model/Product");
const User = require("../model/User");
const Order = require("../model/Order");
router.get(
  "/statics",
  protect,
  restrictTo(["admin"]),
  asyncHandler(async (req, res) => {
    const products = await Product.count({});
    const users = await User.count({});
    const orders = await Order.count({});
    const paidOrders = await Order.count({ isPaid: true });
    const deliveredOrders = await Order.count({ isDelivered: true });
    // const products = await Product.count({});
    res
      .status(200)
      .json({ products, users, orders, paidOrders, deliveredOrders });
  })
);
module.exports = router;
