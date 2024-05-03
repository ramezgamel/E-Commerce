const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    cartItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: Number,
      },
    ],
    totalPrice: Number,
    totalPriceAfterDisCount: Number,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    shipping: Number,
    tax: Number,
  },
  { timestamps: true }
);

cartSchema.pre("save", function (next) {
  this.totalPrice = this.cartItems.reduce(
    (acc, curr) => (acc += curr.price * curr.quantity),
    0
  );
  next();
});

module.exports = mongoose.model("Cart", cartSchema);
