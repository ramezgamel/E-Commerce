const validator = require("../middleware/validator");
const { check, param, checkSchema } = require("express-validator");

const baseSchema = checkSchema({
  name: {
    notEmpty: { errorMessage: "Name is required" },
    isString: { errorMessage: "Name should be String" },
  },
  images: {
    notEmpty: { errorMessage: "Images are required" },
    isArray: { errorMessage: "Max length 5" },
  },
  category: {
    notEmpty: { errorMessage: "Category is required" },
    isMongoId: { errorMessage: "Invalid ID" },
  },
  description: {
    notEmpty: { errorMessage: "Description is required" },
    isString: true,
  },
  brand: {
    notEmpty: { errorMessage: "Description is required" },
  },
  price: {
    notEmpty: { errorMessage: "Price is required" },
    isFloat: true,
  },
  discount: {
    optional: true,
    isInt: {
      lt: 100,
      gt: 0,
    },
  },
  countInStock: {
    notEmpty: { errorMessage: "Count is required" },
    isInt: true,
  },
});

exports.createValidator = [baseSchema, validator];

exports.updateValidator = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isMongoId()
    .withMessage("Invalid ID"),
  baseSchema,
  validator,
];

exports.deleteValidator = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isMongoId()
    .withMessage("Invalid ID"),
  validator,
];

exports.createReviewValidator = [
  param("id")
    .notEmpty()
    .withMessage("Product id is required")
    .isMongoId()
    .withMessage("Invalid ID"),
  check("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isInt({ min: 1, max: 5 }),
  check("comment").notEmpty().withMessage("Comment is required").isString(),
  validator,
];
