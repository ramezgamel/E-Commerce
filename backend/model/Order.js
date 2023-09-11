const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: String,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },
        itemsPrice: {
          type: Number,
          required: true,
          default: 0.0,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        shippingAddress: {
          address: { type: String, required: true },
          city: { type: String, required: true },
        },
        paymentMethod: { type: String, required: true },
        paymentResult: {
          id: String,
          status: String,
          update_time: String,
          email: String,
        },
        isPaid: {
          type: Boolean,
          require: true,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
