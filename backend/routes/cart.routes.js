const router = require("express").Router();
const {
  addProductToCart,
  getUserCart,
  deleteItem,
  applyCoupon,
  clearCart,
} = require("../controller/cart.controller");

router.post("/", addProductToCart);
router.route("/:id").get(getUserCart).delete(clearCart);
router.delete("/:cartId/:itemId", deleteItem);
router.put("/:cartId/applyCoupon", applyCoupon);

module.exports = router;
