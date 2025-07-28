const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const { updateOne, deleteOne, getOne, getAll } = require("./factory");

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  all
module.exports.getUser = getOne(User);
// @desc    get My profile
// @route   GET /api/users/profile
// @access  user
module.exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    name: user.name,
    phoneNumber: user.phoneNumber,
    addresses: user.addresses,
    email: user.email,
    image: user.image,
  });
});
// @desc    Update My profile
// @route   PUT /api/users/profile
// @access  user
module.exports.updateUser = asyncHandler(async (req, res) => {
  const { name, image, phoneNumber, password } = req.body;
  const user = await User.findById(req.user._id);
  const isCorrect = await user.checkPass(password);
  if (!isCorrect) throw new ApiError("Invalid password", 400);
  user.name = name;
  user.image = image;
  user.phoneNumber = phoneNumber;
  await user.save();
  res.status(200).json({
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
    addresses: user.addresses,
  });
});
// @desc    update user password
// @route   POST /api/users/changePass
// @access  user
module.exports.changePassword = asyncHandler(async (req, res) => {
  const { oldPass, newPass } = req.body;
  const user = await User.findById(req.user._id);
  const isCorrect = await user.checkPass(oldPass);
  if (!isCorrect) throw new ApiError("Password is incorrect", 400);
  user.password = newPass;
  await user.save();
  res.status(200).json({ message: "Password changed Successfully" });
});
// @desc    Get all users
// @route   GET /api/users/
// @access  admin
module.exports.getUsers = getAll(User);
// @desc    Update user
// @route   POST /api/users/:userId
// @access  admin
module.exports.updateUserRole = updateOne(User);
// @desc    Delete user
// @route   DELETE /api/users/:userId
// @access  admin
module.exports.deleteUserById = deleteOne(User);
// @desc    Logout user
// @route   POST /api/users/logout
// @access  user
module.exports.logout = asyncHandler(async (req, res) => {
  res.cookie("mhp_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.status(200).json({ message: "Logout Successfully" });
});

// @desc    mark as read
// @route   POST /api/users/notifications/:id
// @access  user
module.exports.markAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const user = await User.findById(_id);
  user?.notifications.forEach((n) => (n._id == id ? (n.isRead = true) : n));
  await user.save();
  res.status(200).json({ status: "success", data: user.notifications });
});
// @desc    Get my Notifications
// @route   GET /api/users/notifications
// @access  user
module.exports.myNotification = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id.toString());
  if (!user) throw new ApiError("Invalid user", 404);
  res.status(200).json({
    notifications: user.notifications.reverse(),
  });
});
