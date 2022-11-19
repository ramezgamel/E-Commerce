const { check } = require("express-validator");
const validator = require("../../middleware/validator");

class subCategoryValidators {
  static createSubCategory = [
    check("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 2 })
      .withMessage("Too short name")
      .isLength({ max: 32 })
      .withMessage("Too long name"),
    check("category")
      .isMongoId()
      .withMessage("Category is required")
      .notEmpty()
      .withMessage("Invalid id format "),
    validator,
  ];

  static getSubCategory = [
    check("id").isMongoId().withMessage("Invalid id format"),
    validator,
  ];
  static updateSubCategory = [
    check("id").isMongoId().withMessage("Invalid id format"),
    validator,
  ];
  static deleteSubCategory = [
    check("id").isMongoId().withMessage("Invalid id format"),
    validator,
  ];
}

module.exports = subCategoryValidators;
