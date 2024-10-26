const router = require("express").Router();
const {
  addProductToCart,
  getUserCart,
  deleteItem,
  applyCoupon,
  clearCart,
  clearCoupon,
} = require("../controller/cart.controller");

router.route("/:id").get(getUserCart).delete(clearCart);
router.post("/", addProductToCart);
router.put("/:cartId/applyCoupon", applyCoupon);
router.delete("/:cartId/clearCoupon", clearCoupon);
router.delete("/:cartId/:productId", deleteItem);

module.exports = router;
