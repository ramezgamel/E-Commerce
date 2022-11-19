const { check } = require("express-validator");
const validator = require("../../middleware/validator");

class categoryValidator {
  static getCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid Category id format"),
    validator,
  ];

  static updateCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid Category id format"),
    validator,
  ];

  static deleteCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid Category id format"),
    validator,
  ];

  static createCategoryValidator = [
    check("name")
      .notEmpty()
      .withMessage("name is required")
      .isLength({ min: 4 })
      .withMessage("Too short name")
      .isLength({ max: 20 })
      .withMessage("Too long name"),
    validator
  ];
};



module.exports = categoryValidator