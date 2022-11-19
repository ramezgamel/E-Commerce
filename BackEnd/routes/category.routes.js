const router = require("express").Router();

const controller = require("../controllers/category.controller");
const catVal = require("../utils/validators/category.validators");
const subCategoriesRoute = require("./subCategory.routes")

router.use("/:categoryId/subCategory", subCategoriesRoute);

router
  .route("/")
  .post(catVal.createCategoryValidator, controller.createCategory)
  .get(controller.getCategories);

router
  .route("/:id")
  .get(catVal.getCategoryValidator, controller.getCategory)
  .put(catVal.updateCategoryValidator, controller.updateCategory)
  .delete(catVal.deleteCategoryValidator, controller.deleteCategory);

module.exports = router;
