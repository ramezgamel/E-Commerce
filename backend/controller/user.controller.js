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

  res.status(201).json(user);
});
module.exports.login = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new ApiError("Invalid email or password", 400));
  const isMatch = await user.checkPass(req.body.password);
  if (!isMatch) return next(new ApiError("Invalid email or password", 400));
  const token = await user.generateToken();
  res.status(200).json(token);
});
module.exports.logout = asyncHandler(async (req, res) => {
  res.status(200).json("logout");
});
// private
module.exports.getProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).json(user);
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
