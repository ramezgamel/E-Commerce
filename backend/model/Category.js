const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Category must be unique"],
      required: [true, "Category required"],
      trim: true,
      minLength: 4,
      maxLength: 20,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
categorySchema.pre("save", function (next) {
  this.slug = slugify(this.name);
  next();
});
module.exports = mongoose.model("Category", categorySchema);
