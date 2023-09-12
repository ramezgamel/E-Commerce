const jwt = require("jsonwebtoken");
const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

module.exports.protect = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SEC_JWT);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      throw new ApiError("Not Authorized, failed token", 401);
    }
  } else {
    throw new ApiError("Not Authorized, no token", 401);
  }
});

module.exports.restrictTo = (roles) => {
  return asyncHandler(async (req, res, next) => {
    const { role } = req.user;
    if (roles.includes(role)) return next();
    throw new ApiError("Not an Admin", 401);
  });
};
