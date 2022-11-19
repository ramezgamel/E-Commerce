const ProductModel = require("../models/product.model");
const HandlerFactory = require("./handlersFactory");

module.exports = class ProductController {

  static getProducts = HandlerFactory.getAll(ProductModel);
  static createProduct = HandlerFactory.createOne(ProductModel);
  static getProduct = HandlerFactory.getOne(ProductModel);
  static updateProduct = HandlerFactory.updateOne(ProductModel);
  static deleteProduct = HandlerFactory.deleteOne(ProductModel);
  
};
