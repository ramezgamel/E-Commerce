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
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0)
    throw new ApiError("No order items", 400);
  const order = new Order({
    user: req.user._id,
    orderItems: orderItems.map((item) => ({
      ...item,
      product: item._id,
      _id: undefined,
    })),
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });
  await order.save();
  res.status(200).send(order);
});
module.exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

module.exports.updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("updateOrderToPaid");
});

module.exports.updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) throw new ApiError("Order not found", 404);
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address,
  };
  const updatedOrder = await Order.save();
  res.status(200).json(updatedOrder);
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
  res.send(order);
});
