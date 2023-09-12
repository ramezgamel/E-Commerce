const asyncHandler = require("express-async-handler");
const Order = require("../model/Order");
const ApiError = require("../utils/apiError");

// private
module.exports.createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
  } = req.body;
  res.send("add order items");
  if (orderItems && orderItems.length == 0)
    throw new ApiError("No order items", 400);
  const order = new Order({
    user: req.user._id,
    orderItems: orderItems.map((itemsPrice) => ({
      ...item,
      product: items._id,
      _id: undefined,
    })),
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
  });
  await order.save();
});
module.exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

module.exports.updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("updateOrderToPaid");
});

// admin
module.exports.updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("updateOrderToDelivered");
});
module.exports.getOrders = asyncHandler(async (req, res) => {
  res.send("get all orders");
});
module.exports.getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate("user", "name email");
  if (!order) throw new ApiError("Order not found", 400);
  res.send("getOrderById");
});
