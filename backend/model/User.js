const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.checkPass = async function (pass) {
  const isCorrect = await bcrypt.compare(pass, this.password);
  return isCorrect;
};
userSchema.methods.generateToken = async function (pass) {
  const sec = process.env.SEC_JWT;
  const token = await jwt.sign({ id: this._id, name: this.name }, sec);
  return token;
};

module.exports = mongoose.model("User", userSchema);
