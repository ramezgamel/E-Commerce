const mongoose = require("mongoose");

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Brand must be unique"],
      required: [true, "Brand required"],
      trim: true,
      minLength: 4,
      maxLength: 20,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
