const { check, checkExact, param } = require("express-validator");
const validator = require("../middleware/validator");

exports.createCatValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category name required")
    .isLength({ min: 4, max: 25 })
    .withMessage("Category name length 4 to 25 chr"),
  (req, res, next) => {
    req.body.slug = req.body.name.toLowerCase();
    next();
  },
  check("image").isString().withMessage("Accept image as URL string"),
  validator,
];
exports.updateCatValidator = [
  param("id").notEmpty().withMessage("ID is required").isMongoId("Invalid ID"),
  check("name")
    .optional()
    .isLength({ min: 4, max: 25 })
    .withMessage("Category name must be 4 to 25 chr"),
  check("image")
    .optional()
    .isString()
    .withMessage("Accept image as URL string"),
  checkExact([], { message: "Unknown fields in body" }),
  validator,
];
exports.getCatValidator = [
  param("id").notEmpty().withMessage("ID is required").isMongoId("Invalid ID"),
  validator,
];
exports.deleteCatValidator = [
  param("id").notEmpty().withMessage("ID is required").isMongoId("Invalid ID"),
  validator,
];
