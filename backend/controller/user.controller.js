const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/apiError");

module.exports.register = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    password: password,
    email: email,
  });
  await user.save();
  const token = await user.generateToken();
  res.cookie("token", token, {
    // signed: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  res.end();
});
module.exports.login = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new ApiError("Invalid email or password", 400));
  const isMatch = await user.checkPass(req.body.password);
  if (!isMatch) return next(new ApiError("Invalid email or password", 400));
  const token = await user.generateToken();
  res.cookie("token", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  res.status(200).json({ id: user._id, name: user.name, email: user.email });
});
module.exports.logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout Successfully" });
});
// private
module.exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError("Not Found this user", 401);
  res.status(200).json(req.user);
});

module.exports.updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, image, password, newPassword } = req.body;
  const user = await User.findById(id);
  res.status(200).json("Deleted");
});
// admin
module.exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});
module.exports.updateUserById = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});
module.exports.deleteUserById = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});
