const router = require("express").Router();
const {
  addProductToCart,
  getUserCart,
  deleteItem,
  applyCoupon,
  clearCart,
} = require("../controller/cart.controller");

router.route("/:id").get(getUserCart).delete(clearCart);
router.post("/", addProductToCart);
router.delete("/:cartId/:productId", deleteItem);
router.put("/:cartId/applyCoupon", applyCoupon);

module.exports = router;
