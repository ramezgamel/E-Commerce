const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
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
    totalPrice: Number,
    totalPriceAfterDisCount: Number,
    shipping: {
      type: Number,
      default: 0,
      max: 100,
    },
    isCoupon: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

cartSchema.pre("save", function (next) {
  this.shipping = this.cartItems.reduce(
    (acc, curr) => (acc += curr.shipping),
    0
  );
  if (this.shipping > 100) this.shipping = 100;
  this.totalPrice = this.cartItems.reduce(
    (acc, curr) => (acc += curr.price * curr.quantity),
    0
  );
  next();
});

module.exports = mongoose.model("Cart", cartSchema);
