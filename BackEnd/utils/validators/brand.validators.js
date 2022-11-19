const { check } = require("express-validator");
const validator = require("../../middleware/validator");

class BrandValidator {
  static getBrandValidator = [
    check("id").isMongoId().withMessage("Invalid Brand id format"),
    validator,
  ];

  static updateBrandValidator = [
    check("id").isMongoId().withMessage("Invalid Brand id format"),
    validator,
  ];

  static deleteBrandValidator = [
    check("id").isMongoId().withMessage("Invalid Brand id format"),
    validator,
  ];

  static createBrandValidator = [
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



module.exports = BrandValidator