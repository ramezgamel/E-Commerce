const router = require("express").Router();

const controller = require("../controllers/category.controller");
const catVal = require("../utils/validators/category.validators");
const subCategoriesRoute = require("./subCategory.routes");
const Authorization = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware")

router.use("/:categoryId/subCategory", subCategoriesRoute);

router
  .route("/")
  .post(
    upload.single("image"),
    catVal.createCategoryValidator,
    Authorization,
    controller.createCategory
  )
  .get(controller.getCategories);

router
  .route("/:id")
  .get(catVal.getCategoryValidator, controller.getCategory)
  .put(
    upload.single("image"),
    catVal.updateCategoryValidator,
    Authorization,
    controller.updateCategory
  )
  .delete(
    catVal.deleteCategoryValidator,
    Authorization,
    controller.deleteCategory
  );

module.exports = router;
