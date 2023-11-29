const router = require("express").Router();
const cloudinary = require("../middleware/cloudinary");
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category.controller");
const upload = require("../middleware/upload");
const { protect, restrictTo } = require("../middleware/auth.middelware");

router.post(
  "/",
  protect,
  restrictTo(["admin"]),
  upload.single("image"),
  cloudinary,
  createCategory
);
router.get("/", getCategories);
router
  .route("/:id")
  .get(getCategory)
  .put(
    protect,
    restrictTo(["admin"]),
    upload.single("image"),
    cloudinary,
    updateCategory
  )
  .delete(protect, restrictTo(["admin"]), deleteCategory);
module.exports = router;
