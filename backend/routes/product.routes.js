const router = require("express").Router();
const controller = require("../controller/products.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");
const {
  createValidator,
  updateValidator,
  deleteValidator,
  createReviewValidator,
} = require("../validators/product.validator");

router.get("/", controller.getProducts);
router.get("/top", controller.getTopProduct);
router.get("/:id", controller.getProduct);
router.use(protect);
router.post("/:id/review", createReviewValidator, controller.createReview);
router.use(restrictTo(["admin"]));
router.post("/", createValidator, controller.createProduct);
router
  .route("/:id")
  .delete(deleteValidator, controller.deleteProduct)
  .put(updateValidator, controller.updateProduct);

module.exports = router;
