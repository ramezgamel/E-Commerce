const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({}, { timestamps: true });
const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: String,
    size: String,
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceAfterDiscount: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    shipping: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: [1, "Min rating value is 1"],
          max: [5, "max rating value is 1"],
        },
        comment: {
          type: String,
          require: true,
        },
      },
    ],
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  if (this.discount) {
    this.priceAfterDiscount = (
      this.price -
      this.price * (this.discount / 100)
    ).toFixed(2);
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
