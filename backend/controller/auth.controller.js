const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Email = require("../utils/email");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const signIn = async (res, user) => {
  const token = await user.generateToken();
  res.cookie("mhp_token", token, {
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
    addresses: user.addresses,
    role: user.role,
  });
};
// @desc    verify token
// @route   GET   /api/verifyToken
// @access  all
module.exports.verifyToken = asyncHandler(async (req, res) => {
  const { mhp_token } = req.cookies;
  if (!mhp_token) throw new ApiError("Not Authorized, no token", 401);
  const decoded = jwt.verify(mhp_token, process.env.SEC_JWT);
  const user = await User.findById(decoded.id).select("-password");
  if (user == null) throw new ApiError("User not found");
  res.status(200).json(user);
});
// @desc    Register new user
// @route   POST /api/users/register
// @access  all
module.exports.register = asyncHandler(async (req, res) => {
  const {
    name,
    password,
    email,
    image,
    phoneNumber,
    passwordConfirmation,
    addresses,
  } = req.body;

  const user = new User({
    name,
    password,
    email,
    image,
    phoneNumber,
    addresses,
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
// @desc    forget password
// @route   POST /api/users/forgetPassword
// @access  all
module.exports.forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new ApiError("No user with this email", 404);
  const resetCode = user.resetCode();
  if (!resetCode) throw new ApiError("Cannot generate reset token", 400);
  try {
    await new Email(user, resetCode).sendPasswordReset(user.name);
    await user.save();
  } catch (error) {
    user.passwordResetCode = undefined;
    user.passwordResetCodeExpires = undefined;
    await user.save();
    throw new ApiError("There is an error in sending email", 500);
  }
  res.status(200).json({
    status: "success",
    message: "Reset code sent to email",
  });
});
// @desc    verify reset code
// @route   POST /api/users/verifyCode
// @access  user
module.exports.verifyResetCode = asyncHandler(async (req, res) => {
  const { resetCode } = req.body;
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");
  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetCodeExpires: { $gt: Date.now() },
  });
  if (!user) throw new ApiError("Code is invalid or has expired", 400);
  user.passwordResetVerified = true;
  await user.save();
  res.status(200).json({ status: "success" });
});
// @desc    reset password
// @route   POST /api/users/resetPassword
// @access  user
module.exports.resetPassword = asyncHandler(async (req, res) => {
  const { newPassword, confirmPassword, email } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    throw new ApiError(`There is no user with this email: ${email}`, 404);
  if (!user.passwordResetVerified)
    throw new ApiError("Reset code not verified", 400);
  if (newPassword !== confirmPassword)
    throw new ApiError("Passwords doesn't match", 400);
  user.password = newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetCodeExpires = undefined;
  user.passwordResetVerified = undefined;
  await user.save();
  await signIn(res, user);
});
