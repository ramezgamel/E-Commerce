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
    wishList: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Product",
      },
    ],
    addresses: [
      {
        alias: {
          type: String,
        },
        details: {
          type: String,
        },
        phone: String,
        city: String,
        postalCode: String,
      },
    ],
    notifications: [notificationSchema],
    passwordResetCode: String,
    passwordResetVerified: {
      type: Boolean,
      default: false,
    },
    passwordResetCodeExpires: Date,
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
userSchema.methods.generateToken = async function () {
  const sec = process.env.SEC_JWT;
  const token = await jwt.sign({ id: this._id, role: this.role }, sec);
  return token;
};
userSchema.methods.resetCode = function () {
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  this.passwordResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");
  this.passwordResetCodeExpires = Date.now() + 5 * 60 * 1000;
  return resetCode;
};

module.exports = mongoose.model("User", userSchema);
