const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Order must belong to user"],
      ref: "User",
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          require: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
          require: true,
        },
        shipping: {
          type: Number,
          default: 0,
        },
        tax: {
          type: Number,
          default: 0,
        },
      },
    ],
    orderPrice: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Number,
      default: 0,
      max: 100,
    },
    tax: {
      type: Number,
      default: 0,
    },
    shippingAddress: {
      details: { type: String, required: true },
      alias: { type: String, required: true },
      postalCode: String,
      phone: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card"],
      default: "cash",
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
