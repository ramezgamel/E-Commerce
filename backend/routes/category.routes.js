const router = require("express").Router();
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category.controller");
const upload = require("../middleware/upload");
const { resizeCatPhoto } = require("../middleware/resize");
const { protect, restrictTo } = require("../middleware/auth.middelware");

router.post(
  "/",
  protect,
  restrictTo(["admin"]),
  upload.single("image"),
  resizeCatPhoto,
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
    resizeCatPhoto,
    updateCategory
  )
  .delete(protect, restrictTo(["admin"]), deleteCategory);
module.exports = router;
