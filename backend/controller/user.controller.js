const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

// @desc    Register new user
// @route   POST /api/users/register
// @access  all
module.exports.register = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;
  const user = new User({
    name,
    password,
    email,
  });
  if (req.file) {
    user.image = req.file.filename;
  }
  await user.save();
  const token = await user.generateToken();
  res.cookie("token", token, {
    // signed: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  res.json({ id: user._id, name: user.name, email: user.email });
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
    sameSite: "None",
    secure: true,
    // secure: process.env.NODE_ENV !== "development",
  });
  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

module.exports.logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout Successfully" });
});
// private

module.exports.updateUser = asyncHandler(async (req, res) => {
  if (req.body.hasOwnProperty("role"))
    throw new ApiError("Can't update role", 403);
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError("Invalid user", 404);
  const checkPass = await user.checkPass(req.body.password);
  if (!checkPass) throw new ApiError("Incorrect password");
  Object.keys(req.body).forEach(function (key) {
    user[key] = req.body[key];
  });
  await user.save();
  res.status(200).json(user);
});
// admin
module.exports.getUsers = asyncHandler(async (req, res) => {
  const countDocuments = await User.countDocuments();
  const features = new ApiFeatures(User.find({}), req.query)
    .sort()
    .search()
    .paginate(countDocuments);
  const users = await features.query;
  if (!users) throw new ApiError("No users found", 404);
  res.status(200).json({
    totalPages: features.totalPages,
    page: features.page,
    limit: features.limit,
    result: users,
  });
});
module.exports.updateUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  Object.keys(req.body).forEach(function (key) {
    user[key] = req.body[key];
  });
  await user.save();
  res.status(200).json(user);
});
module.exports.deleteUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(200).json("deleted");
});
