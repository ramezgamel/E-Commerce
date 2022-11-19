const mongoose = require("mongoose");
// add reviews to product
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product Category is required"],
    },
    subCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
    colors: [String],
    images: [String],
    coverImage: {
      type: String,
      required: [true, "Product image cover is required"],
    },
    desc: {
      type: String,
      required: [true, "Description is required"],
      minLength: [20, "Too short description"],
    },
    price: {
      type: Number,
      trim: true,
      require: [true, "Product price is required"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    ratingAverage: {
      type: Number,
      min: [1, "Rating must be above or equal 1"],
      max: [5, "Rating must be below or equal 5"],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.pre(/^find/, function (next) {
  this.populate({ path: "category", select: "name" });
  next();
});

module.exports = mongoose.model("Product", productSchema);
