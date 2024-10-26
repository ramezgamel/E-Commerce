const Coupon = require("../model/Coupon");
const ApiError = require("../utils/apiError");
const { createOne, updateOne, deleteOne, getAll } = require("./factory");
const asyncHandler = require("express-async-handler");

exports.getCoupons = getAll(Coupon);
exports.getCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findOne({ name: req.query.couponName });
  if (!coupon) throw new ApiError("Invalid coupon", 404);
  res.status(200).json(coupon);
});
exports.createCoupon = createOne(Coupon);
exports.updateCoupon = updateOne(Coupon);
exports.deleteCoupon = deleteOne(Coupon);
