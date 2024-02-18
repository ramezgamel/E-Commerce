const router = require("express").Router();
const controller = require("../controller/products.controller");
const { protect, restrictTo } = require("../middleware/auth.middelware");
const {
  createValidator,
  updateValidator,
  deleteValidator,
  createReviewValidator,
} = require("../validators/product.validator");
router.get("/", controller.getProducts);
router.get("/top", controller.getTopProduct);
router.get("/:id", controller.getProduct);
router.post(
  "/:id/review",
  protect,
  createReviewValidator,
  controller.createReview
);
router.post(
  "/",
  protect,
  restrictTo(["admin"]),
  createValidator,
  controller.createProduct
);
router.delete(
  "/:id",
  protect,
  restrictTo(["admin"]),
  deleteValidator,
  controller.deleteProduct
);
router.put(
  "/:id",
  protect,
  restrictTo(["admin"]),
  updateValidator,
  controller.updateProduct
);

module.exports = router;
