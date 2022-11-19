const SubCategoryModel = require("../models/subCategory.model");
const HandlerFactory = require("./handlersFactory");

class subCategoryController {
  static setCategoryIdInBody = (req, res, next) => {
    if (!req.body.category) req.body.category = req.params.categoryId;
    next();
  };

  static createSubCategory = HandlerFactory.createOne(SubCategoryModel);
  static getSubCategory = HandlerFactory.getOne(SubCategoryModel);
  static updateSubCategory = HandlerFactory.updateOne(SubCategoryModel);
  static deleteSubCategory = HandlerFactory.deleteOne(SubCategoryModel);
  static getSubCategories = HandlerFactory.getAll(SubCategoryModel);
  
} 

module.exports = subCategoryController