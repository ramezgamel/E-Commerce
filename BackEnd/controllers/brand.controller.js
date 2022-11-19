const HandlerFactory = require("./handlersFactory")
const BrandModel = require("../models/brand.model");

class Brand {

  static createBrand = HandlerFactory.createOne(BrandModel);
  static getBrands = HandlerFactory.getAll(BrandModel);
  static updateBrand = HandlerFactory.updateOne(BrandModel);
  static deleteBrand = HandlerFactory.deleteOne(BrandModel);
  static getBrand = HandlerFactory.getOne(BrandModel);
}

module.exports = Brand;
