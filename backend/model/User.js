const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const notificationSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  date: Date,
  content: String,
  refId: mongoose.SchemaTypes.ObjectId,
  isRead: {
    type: Boolean,
    default: false,
  },
});
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
      default:
        "https://res.cloudinary.com/dfv2vlj7u/image/upload/f_auto,q_auto/k7ayyu7n0orspymdwoe4",
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "{VALUE} is not supported",
        default: "user",
      },
    },
    notifications: [notificationSchema],
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.checkPass = async function (pass) {
  const isCorrect = await bcrypt.compare(pass, this.password);
  return isCorrect;
};
userSchema.methods.generateToken = async function (pass) {
  const sec = process.env.SEC_JWT;
  const token = await jwt.sign({ id: this._id, role: this.role }, sec);
  return token;
};

userSchema.methods.resetToken = function () {
  const resToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resToken)
    .digest("hex");
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
  return resToken;
};

module.exports = mongoose.model("User", userSchema);
