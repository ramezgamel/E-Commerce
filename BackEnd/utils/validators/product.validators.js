const validator = require("../../middleware/validator");
const { check } = require("express-validator");
const categoryModel = require("../../models/category.model");
const subCategoryModel = require("../../models/subCategory.model");

const ApiError = require("../apiError");
// make a custom check on priceAfterDiscount
module.exports = class ProductValidator {
  static createValidator = [
    check("name").notEmpty().withMessage("Title is required"),
    check("desc")
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ min: 20 })
      .withMessage("Too Short description")
      .isLength({ max: 1000 })
      .withMessage("Too long description"),
    check("quantity")
      .notEmpty()
      .withMessage("Product quantity is required")
      .isNumeric()
      .withMessage("Must be a number"),
    check("sold").optional().isNumeric().withMessage("Must be a number"),
    check("price")
      .notEmpty()
      .withMessage("Product Price is required")
      .isNumeric()
      .withMessage("Must be a number"),
    check("priceAfterDiscount")
      .optional()
      .toFloat()
      .isNumeric()
      .withMessage("Must be a number")
      .custom((value, { req }) => {
        if (req.body.price <= value) {
          throw new Error("Value must be less than price");
        }
        return true;
      }),
    check("colors")
      .optional()
      .isArray()
      .withMessage("Available colors must be array of string"),
    check("images")
      .optional()
      .isArray()
      .withMessage("Available images must be array of string"),
    check("coverImage").notEmpty().withMessage("Cover image is required"),
    check("category")
      .notEmpty()
      .withMessage("Category is required")
      .isMongoId()
      .withMessage("Invalid ID format")
      .custom(async (categoryID) => {
        const cat = await categoryModel.findById(categoryID);
        if (!cat)
          throw new ApiError(`No category for this id: ${categoryID}`, 404);
        return categoryID;
      }),
    check("subCategories")
      .optional()
      .isMongoId()
      .withMessage("Invalid ID format")
      .custom(async (subCatArray, { req }) => {
        const cat = await categoryModel.findById(req.body.category);
        for (let id of subCatArray) {
          const sub = await subCategoryModel.findById(id);
          if (!sub)
            throw new ApiError(`No subCategory for this id: ${id}`, 404);
          if (!sub.category.equals(cat._id))
            throw new ApiError(
              `This subCategory(${sub.name}) not belong to main category`,
              404
            );
        }
      }),
    check("brand").optional().isMongoId().withMessage("Invalid ID format"),
    check("ratingAverage")
      .optional()
      .isNumeric()
      .withMessage("RatingAverage must be a number")
      .isLength({ min: 1 })
      .withMessage("Rating average must be above or equal than 1")
      .isLength({ max: 5 })
      .withMessage("Rating average must be below or equal than 1"),
    check("ratingQuantity")
      .optional()
      .isNumeric()
      .withMessage("RatingQuantity must be a number"),

    validator,
  ];

  static getValidator = [
    check("id").isMongoId().withMessage("Invalid ID format"),
    validator,
  ];
  static updateValidator = [
    check("id").isMongoId().withMessage("Invalid ID format"),
    validator,
  ];
  static deleteValidator = [
    check("id").isMongoId().withMessage("Invalid ID format"),
    validator,
  ];
};
