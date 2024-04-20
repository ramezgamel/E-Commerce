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
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("Min length is 6 character.")
    .custom((password, { req }) => {
      if (password != req.passwordConfirmation)
        throw new Error("Password Confirmation is incorrect.");
      return true;
    }),
  check("passwordConfirmation")
    .notEmpty()
    .withMessage("password confirmation is required"),
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
