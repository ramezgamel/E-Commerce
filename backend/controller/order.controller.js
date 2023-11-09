const asyncHandler = require("express-async-handler");
const Order = require("../model/Order");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const { io } = require("../app");
// @desc    Create Order
// @route   POST /api/orders
// @access  user
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
// @desc    Get my orders
// @route   GET /api/orders/mine
// @access  user
module.exports.getMyOrders = asyncHandler(async (req, res) => {
  const countDocuments = await Order.countDocuments();
  const features = new ApiFeatures(
    Order.find({ user: req.user._id }),
    req.query
  )
    .sort()
    .search()
    .paginate(countDocuments);
  const orders = await features.query;

  if (!orders) throw new ApiError("Don't have any orders yet", 404);
  res.status(200).json({
    totalPages: features.totalPages,
    page: features.page,
    limit: features.limit,
    result: orders,
  });
});

// @desc    Paid order
// @route   PUT /api/orders/:id/pay
// @access  user
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
  const updatedOrder = await order.save();
  res.status(200).json(updatedOrder);
});

// @desc    Deliver order
// @route   PUT /api/orders/:id/deliver
// @access  admin
module.exports.updateOrderToDelivered = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) throw new ApiError("Order not found", 404);
  order.isDelivered = true;
  order.deliveredAt = Date.now();
  const updatedOrder = await order.save();
  io.on("connection", (socket) => {
    socket.emit("notification", "message");
  });
  res.status(200).send(updatedOrder);
});
// @desc    Get all orders
// @route   GET /api/orders
// @access  admin
module.exports.getOrders = asyncHandler(async (req, res) => {
  const countDocuments = await Order.countDocuments();
  const features = new ApiFeatures(
    Order.find({}).populate("user", "id name"),
    req.query
  )
    .sort()
    .search()
    .filter()
    .fields()
    .paginate(countDocuments);
  const orders = await features.query;
  if (!orders) throw new ApiError("No orders to show", 404);
  res.status(200).send({
    totalPages: features.totalPages,
    page: features.page,
    limit: features.limit,
    result: orders,
  });
});
// @desc    Get specific order
// @route   GET /api/orders/:id
// @access  admin
module.exports.getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate("user", "name email");
  if (!order) throw new ApiError("Order not found", 400);
  res.send(order);
});
