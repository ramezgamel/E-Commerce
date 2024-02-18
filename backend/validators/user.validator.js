const validator = require("../middleware/validator");
const { check, param, checkSchema } = require("express-validator");
const baseSchema = checkSchema({
  email: {
    notEmpty: { errorMessage: "Email is required" },
    isEmail: { errorMessage: "Invalid email" },
  },
  password: {
    notEmpty: { errorMessage: "Password is required" },
  },
});
exports.registerValidator = [
  baseSchema,
  check("name").isString().notEmpty().withMessage("User name is required"),
  check("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone("ar-EG"),
  validator,
];

exports.loginValidator = [baseSchema, validator];

exports.updateUserValidator = [
  param("id").isMongoId().withMessage("Invalid ID"),
  baseSchema,
  check("name").isString(),
  check("phoneNumber").isMobilePhone("ar-EG"),
  validator,
];
