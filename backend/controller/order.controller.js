const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECKEY);
const Order = require("../model/Order");
const ApiError = require("../utils/apiError");
const factory = require("./factory");
const Cart = require("../model/Cart");
const Product = require("../model/Product");
const User = require("../model/User");
// @desc    Create Order
// @route   POST /api/orders
// @access  user
module.exports.createOrder = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.body.cartId);
  if (!cart) throw new ApiError("Invalid cart id", 404);
  const order = await Order.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    shipping: cart.shipping,
    tax: cart.tax,
    orderPrice: cart.totalPriceAfterDiscount
      ? cart.totalPriceAfterDiscount
      : cart.totalPrice,
    shippingAddress: { ...req.body.address, phone: req.user.phoneNumber },
    paymentMethod: req.body.paymentMethod,
  });

  await bulk(order, cart);

  res.status(200).send({ status: "success", data: order });
});
// @desc    Get my orders
// @route   GET /api/orders/mine
// @access  user
module.exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate({
    path: "user",
    select: "name",
  });
  if (!orders) throw new ApiError("No Orders yet", 404);
  res.status(200).json({ data: orders });
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
  res.status(200).json({ updatedOrder });
});
// @desc    Get all orders
// @route   GET /api/orders
// @access  admin
module.exports.getOrders = factory.getAll(Order);
// @desc    Get specific order
// @route   GET /api/orders/:id
// @access  admin
module.exports.getOrderById = factory.getOne(Order, [
  { path: "user", select: "name" },
  { path: "cartItems.product", select: "_id name images" },
]);
// @desc    Get session url
// @route   GET /api/orders/checkout-session/cartId
// @access  user
module.exports.createSession = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.cartId);
  if (!cart) throw new ApiError("Invalid cart id", 400);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          product_data: {
            name: req.user.name,
          },
          currency: "egp",
          unit_amount:
            (cart.totalPriceAfterDiscount
              ? cart.totalPriceAfterDiscount
              : cart.totalPrice) * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/placeorder`,
    cancel_url: `${process.env.CLIENT_URL}/profile/orders`,
    customer_email: req.user.email,
    client_reference_id: req.params.cartId,
    metadata: { ...req.body.address, phone: req.user.phoneNumber },
  });
  res.status(200).json(session);
});

module.exports.webhookCheckOut = asyncHandler(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  console.log(sig);
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SEC
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  switch (event.type) {
    case "checkout.session.completed":
      createNewOrder(event.data.object);
  }
  res.status(200).json({ payment: "success" });
});

async function createNewOrder(session) {
  const cart = await Cart.findById(session.client_reference_id);
  const user = await User.findOne({ email: session.customer_email });
  if (!cart) throw new ApiError("Invalid cart id", 404);
  if (!user) throw new ApiError("Couldn't find this user", 404);

  const order = await Order.create({
    user: user._id,
    cartItems: cart.cartItems,
    shipping: cart.shipping,
    tax: cart.tax,
    orderPrice: session.amount_total / 100,
    paymentMethod: "card",
    isPaid: true,
    paidAt: Date.now(),
  });

  await bulk(order, cart);
}

async function bulk(order, cart) {
  if (order) {
    const bulkOpt = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: {
          $inc: { countInStock: -item.quantity, sold: +item.quantity },
        },
      },
    }));
    await Product.bulkWrite(bulkOpt, {});
  }
  await Cart.findByIdAndDelete(cart._id);
}
