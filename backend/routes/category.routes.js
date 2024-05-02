const router = require("express").Router();
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category.controller");
const validator = require("../validators/category.validator");
const { protect, restrictTo } = require("../middleware/auth.middleware");

router.get("/", getCategories);
router.get("/:id", validator.getCatValidator, getCategory);
router.use(protect, restrictTo(["admin"]));
router.post("/", validator.createCatValidator, createCategory);

router
  .route("/:id")
  .put(validator.updateCatValidator, updateCategory)
  .delete(deleteCategory);
module.exports = router;
