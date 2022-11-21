const router= require("express").Router({mergeParams: true});

const SubCategory = require("../controllers/subCategory.controller");
const subCatValidator = require("../utils/validators/subCategory.validators");
const Authorization = require("../middleware/auth.middleware");



router
  .route("/")
  .post(SubCategory.setCategoryIdInBody, subCatValidator.createSubCategory, Authorization, SubCategory.createSubCategory)
  .get(SubCategory.getSubCategories);

router.route("/:id")
  .get(subCatValidator.getSubCategory, SubCategory.getSubCategory)
  .delete(subCatValidator.deleteSubCategory, Authorization, SubCategory.deleteSubCategory)
  .put(subCatValidator.updateSubCategory, Authorization, SubCategory.updateSubCategory)
  

module.exports = router