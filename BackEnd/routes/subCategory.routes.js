const router= require("express").Router({mergeParams: true});

const SubCategory = require("../controllers/subCategory.controller");
const subCatValidator = require("../utils/validators/subCategory.validators");



router
  .route("/")
  .post(SubCategory.setCategoryIdInBody,subCatValidator.createSubCategory, SubCategory.createSubCategory)
  .get(SubCategory.getSubCategories);

router.route("/:id")
  .get(subCatValidator.getSubCategory, SubCategory.getSubCategory)
  .delete(subCatValidator.deleteSubCategory, SubCategory.deleteSubCategory)
  .put(subCatValidator.updateSubCategory, SubCategory.updateSubCategory)
  

module.exports = router