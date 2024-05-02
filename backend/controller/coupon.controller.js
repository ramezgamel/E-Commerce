const Coupon = require("../model/Coupon");
const {
  getOne,
  createOne,
  updateOne,
  deleteOne,
  getAll,
} = require("./factory");

exports.getCoupons = getAll(Coupon);
exports.getCoupon = getOne(Coupon);
exports.createCoupon = createOne(Coupon);
exports.updateCoupon = updateOne(Coupon);
exports.deleteCoupon = deleteOne(Coupon);
