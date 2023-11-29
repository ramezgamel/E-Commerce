const asyncHandler = require("express-async-handler");
const Order = require("../model/Order");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const { io } = require("../app");
const Product = require("../model/Product");
// @desc    Create Order
// @route   POST /api/orders
// @access  user
module.exports.createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;
  if ((orderItems && orderItems.length === 0) || !orderItems)
    throw new ApiError("No order items", 400);
  const itemsId = orderItems.map((item) => item._id);
  const items = await Product.find({ _id: { $in: itemsId } });
  // check on qty if not in stock
  const itemsPrice = items
    .reduce((acc, item) => {
      const orderItem = orderItems.find((i) => i._id == item._id);
      return acc + item.price * orderItem.qty;
    }, 0)
    .toFixed(2);
  const shippingPrice = itemsPrice > 100 || itemsPrice == 0 ? 0 : 10;
  const taxPrice = (0.15 * itemsPrice).toFixed(2);
  const totalPrice = (+itemsPrice + +shippingPrice + +taxPrice).toFixed(2);
  const order = new Order({
    user: req.user._id,
    orderItems: items.map((item) => {
      const itemOrder = orderItems.find((i) => i._id == item._id);
      return {
        qty: +itemOrder.qty,
        _id: item._id,
        name: item.name,
        price: item.price,
        images: item.images,
      };
    }),
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
  res.status(200).json(updatedOrder);
});
// @desc    Get all orders
// @route   GET /api/orders
// @access  admin
module.exports.getOrders = asyncHandler(async (req, res) => {
  const countDocuments = await Order.countDocuments();
  const features = new ApiFeatures(Order.find({}), req.query)
    .sort()
    .search()
    .filter()
    .fields()
    .paginate(countDocuments);
  const orders = await features.query.populate("user", "name");
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
  res.status(200).send(order);
});
