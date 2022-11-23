const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    profileImage: {
      type: String,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function(){
  const user = this.toObject();
  delete user.password;
  return user
}

userSchema.pre("save", async function () {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.method("genAuthToken", function () {
  if (!process.env.JWTSEC) throw new Error("JSONSEC not init");
  return jwt.sign(
    {
      userId: this._id,
      isAdmin: this.isAdmin,
    },
    process.env.JWTSEC
  );
});

userSchema.method("checkPass", async function (_inputPass) {
  return await bcrypt.compare(_inputPass, this.password);
});
module.exports = mongoose.model("User", userSchema);
