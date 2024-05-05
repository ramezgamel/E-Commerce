const jwt = require("jsonwebtoken");
const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

module.exports.protect = asyncHandler(async (req, res, next) => {
  const { mhp_token } = req.cookies;
  if (!mhp_token) throw new ApiError("Not Authorized, no token", 401);
  const decoded = jwt.verify(mhp_token, process.env.SEC_JWT);
  const user = await User.findById(decoded.id).select("-password");
  if (user == null) throw new ApiError("User not found");
  req.user = user;
  next();
});

module.exports.restrictTo = (roles) => {
  return asyncHandler(async (req, res, next) => {
    const { role } = req.user;
    if (roles.includes(role)) return next();
    throw new ApiError("Not an Admin", 401);
  });
};
