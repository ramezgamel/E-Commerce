const router = require("express").Router();
// const cloudinary = require("../middleware/cloudinary");
// const upload = require("../middleware/upload");
const controller = require("../controller/products.controller");
const { protect, restrictTo } = require("../middleware/auth.middelware");
router.get("/", controller.getProducts);
router.get("/top", controller.getTopProduct);
router.get("/:id", controller.getProduct);
router.post("/:id/review", protect, controller.createReview);
router.post(
  "/",
  protect,
  restrictTo(["admin"]),
  // upload.array("images", 5),
  // cloudinary,
  controller.createProduct
);
router.delete("/:id", protect, restrictTo(["admin"]), controller.deleteProduct);
router.put(
  "/:id",
  protect,
  restrictTo(["admin"]),
  // upload.array("images", 5),
  // cloudinary,
  controller.updateProduct
);

module.exports = router;
