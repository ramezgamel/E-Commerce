const router = require("express").Router();

const controller = require("../controller/products.controller");
const { protect, restrictTo } = require("../middleware/auth.middelware");
const upload = require("../middleware/upload");
const { resizePhotos } = require("../middleware/resize");
router.get("/", controller.getProducts);
router.get("/top", controller.getTopProduct);
router.get("/:id", controller.getProduct);
router.post("/:id/review", protect, controller.createReview);
router.post(
  "/",
  protect,
  restrictTo(["admin"]),
  upload.array("images", 5),
  resizePhotos,
  controller.createProduct
);
router.delete("/:id", protect, restrictTo(["admin"]), controller.deleteProduct);
router.put(
  "/:id",
  protect,
  restrictTo(["admin"]),
  upload.array("images", 5),
  controller.updateProduct
);

module.exports = router;
