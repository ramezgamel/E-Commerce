const CategoryModel = require("../models/category.model");
const HandlerFactory = require("./handlersFactory")

class Category {
  static createCategory = HandlerFactory.createOne(CategoryModel);
  static getCategories = HandlerFactory.getAll(CategoryModel);
  static updateCategory = HandlerFactory.updateOne(CategoryModel);
  static deleteCategory = HandlerFactory.deleteOne(CategoryModel);
  static getCategory = HandlerFactory.getOne(CategoryModel);
}

module.exports = Category;
