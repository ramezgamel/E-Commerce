const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const Email = require("../utils/email");
const crypto = require("crypto");

const signIn = async (res, user) => {
  const token = await user.generateToken();
  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "None",
    // secure: process.env.NODE_ENV !== "development" ? true : false,
    secure: true,
  });
  res.json({
    name: user.name,
    _id: user._id,
    image: user.image,
    email: user.email,
    role: user.role,
  });
};
// @desc    Register new user
// @route   POST /api/users/register
// @access  all
module.exports.register = asyncHandler(async (req, res) => {
  const { name, password, email, image, phoneNumber } = req.body;
  const user = new User({
    name,
    password,
    email,
    image,
    phoneNumber,
  });
  await user.save();
  const url = `${req.protocol}://${req.get("host")}/profile`;
  await new Email(user, url).sendWelcome();
  await signIn(res, user);
});
// @desc    Login user
// @route   POST /api/users/login
// @access  all
module.exports.login = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new ApiError("Invalid email or password", 400));
  const isMatch = await user.checkPass(req.body.password);
  if (!isMatch) return next(new ApiError("Invalid email or password", 400));
  await signIn(res, user);
});
// @desc    Logout user
// @route   POST /api/users/logout
// @access  all
module.exports.logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.json({ message: "Logout Successfully" });
});
// @desc    Get my Notifications
// @route   GET /api/users/notifications
// @access  user
module.exports.myNotification = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError("Invalid user", 404);
  res.status(200).json({
    notifications: user.notifications.reverse(),
  });
});
// @desc    Update My profile
// @route   POST /api/users/profile
// @access  user
module.exports.updateUser = asyncHandler(async (req, res) => {
  if ("role" in req.body) throw new ApiError("Can't update role", 403);
  const { password } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError("Invalid user", 404);
  if (!password) throw new ApiError("Password is required", 404);
  const checkPass = await user.checkPass(password);
  if (!checkPass) throw new ApiError("Incorrect password");
  Object.keys(req.body).forEach(function (key) {
    user[key] = req.body[key];
  });
  await user.save();
  res.status(200).json(user);
});
// @desc    Get all users
// @route   POST /api/users/
// @access  admin
module.exports.getUsers = asyncHandler(async (req, res) => {
  const countDocuments = await User.countDocuments();
  const features = new ApiFeatures(User.find({}), req.query)
    .sort()
    .search()
    .fields()
    .filter()
    .paginate(countDocuments);
  const users = await features.query.select("-password");
  if (!users) throw new ApiError("No users found", 404);
  res.status(200).json({
    totalPages: features.totalPages,
    page: features.page,
    limit: features.limit,
    result: users,
  });
});
// @desc    Update user
// @route   POST /api/users/:userId
// @access  admin
module.exports.updateUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  Object.keys(req.body).forEach(function (key) {
    user[key] = req.body[key];
  });
  await user.save();
  res.status(200).json(user);
});
// @desc    Delete user
// @route   DELETE /api/users/:userId
// @access  admin
module.exports.deleteUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(200).json("deleted");
});
// @desc    forget password
// @route   POST /api/users/forgetPassword
// @access  all
module.exports.forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new ApiError("No user with this email", 404);
  const resetToken = user.resetToken();
  if (!resetToken) throw new ApiError("Cannot generate reset token", 400);
  await user.save({ validateBeforeSave: false });
  const resetUrl = `${process.env.CLIENT_URL}/resetPassword/${resetToken}`;
  await new Email(user, resetUrl).sendPasswordReset();
  res.status(200).json({
    status: "success",
    message: "Token sent to email",
  });
});
// @desc    reset password
// @route   POST /api/users/resetPassword
// @access  user
module.exports.resetPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    throw new ApiError("Passwords doesn't match", 400);
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });
  if (!user) throw new ApiError("Token is invalid or has expired", 400);
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  await user.save();
  await signIn(res, user);
});
// @desc function to push notification to admins
module.exports.pushNotification = asyncHandler(
  async (notification, receiver) => {
    if (!receiver) {
      const users = await User.find({ role: "admin" }).select("-password");
      users.forEach(async (user) => {
        user.notifications = [...user.notifications, notification];
        await user.save();
      });
    } else {
      const user = await User.findById(receiver);
      user.notifications = [...user.notifications, notification];
      await user.save();
    }
  }
);
module.exports.pushToAdmins = asyncHandler(async (notification) => {
  const users = await User.find({ role: "admin" });
  users.forEach(async (user) => {
    addNotification(user, notification);
  });
});
module.exports.pushToUser = asyncHandler(async (userId, notification) => {
  const user = await User.findById(userId);
  addNotification(user, notification);
});
module.exports.pushToSomeUsers = asyncHandler(async (usersId, notification) => {
  const users = await User.find({ _id: { $in: usersId } });
  users.forEach(async (user) => {
    addNotification(user, notification);
  });
});
module.exports.pushToAllUsers = asyncHandler(async (notification) => {
  const users = await User.find({ role: "user" });
  users.forEach(async (user) => {
    user.notifications = [...user.notifications, notification];
    await user.save();
  });
  return users;
});

module.exports.publishNotification = asyncHandler(
  async (notification, receiver) => {
    let users = [];
    if (receiver == "all") {
      users = await User.find({}).select("-password");
    } else if (receiver == "users") {
      users = await User.find({ role: "user" }).select("-password");
    } else {
      usersPromise = receiver.map((id) => User.findById(id));
      users = await Promise.all(usersPromise);
    }
    users.forEach(async (user) => {
      user.notifications = [...user.notifications, notification];
      await user.save();
    });
    return users;
  }
);
module.exports.markAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const user = await User.findById(_id);
  user?.notifications.forEach((n) => (n._id == id ? (n.isRead = true) : n));
  await user.save();
  res.status(200).json({ status: "success", data: user.notifications });
});

async function addNotification(user, notification) {
  user.notifications = [...user.notifications, notification];
  await user.save();
}
