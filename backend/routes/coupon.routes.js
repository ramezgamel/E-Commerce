const router = require("express").Router();
const { protect, restrictTo } = require("../middleware/auth.middelware");
const {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controller/coupon.controller");
router.use(protect, restrictTo("admin"));
router.route("/").get(getCoupons).post(createCoupon);
router.route("/:id").put(updateCoupon).delete(deleteCoupon);
module.exports = router;
