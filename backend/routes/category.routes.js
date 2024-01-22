const router = require("express").Router();
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category.controller");
const { protect, restrictTo } = require("../middleware/auth.middelware");

router.post("/", protect, restrictTo(["admin"]), createCategory);
router.get("/", getCategories);
router
  .route("/:id")
  .get(getCategory)
  .put(protect, restrictTo(["admin"]), updateCategory)
  .delete(protect, restrictTo(["admin"]), deleteCategory);
module.exports = router;
