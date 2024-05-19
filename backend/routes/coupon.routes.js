const router = require("express").Router();
const { protect, restrictTo } = require("../middleware/auth.middleware");
const {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getCoupon,
} = require("../controller/coupon.controller");

router.get("/getOne", getCoupon);
router.use(protect, restrictTo("admin"));
router.route("/").get(getCoupons).post(createCoupon);
router.route("/:id").put(updateCoupon).delete(deleteCoupon);
module.exports = router;
