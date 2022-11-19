const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "SubCategory is required"],
      trim: true,
      unique: [true, "SubCategory name must be unique"],
      minLength: [2, "Too short subCategory name"],
      maxLength: [32, "Too long subCategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must be belong to main Category"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);