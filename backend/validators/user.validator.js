const validator = require("../middleware/validator");
const { check, param, checkExact } = require("express-validator");
const isArrayOfString = require("./isArrayOfString");
const isEnumValue = require("./isEnumValue");
const isArrayOfObjects = require("./isArrayOfObject");

exports.registerValidator = [
  check("name").isString().notEmpty().withMessage("User name is required"),
  check("image").optional().isString("Image should be URL string"),
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email required"),
  check("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone("ar-EG")
    .withMessage("Invalid phone number."),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("Min length is 6 character.")
    .custom((password, { req }) => {
      if (password != req.body.passwordConfirmation)
        throw new Error("Password Confirmation is incorrect.");
      return true;
    }),
  check("passwordConfirmation")
    .notEmpty()
    .withMessage("password confirmation is required"),
  check("addresses")
    .notEmpty()
    .withMessage("Address required")
    .custom(isArrayOfObjects),
  checkExact(
    [],
    { locations: ["body"] },
    {
      message: (fields) => {
        const [field] = fields;
        return `Can't add ${field.path} field`;
      },
    }
  ),
  validator,
];

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email"),
  check("password").notEmpty().withMessage("Password is required"),
  validator,
];

exports.updateUserValidator = [
  check("name").optional().isString(),
  check("phoneNumber").optional().isMobilePhone("ar-EG"),
  // check("addresses").custom(isArrayOfObjects),
  // check("addresses.*.details")
  //   .notEmpty()
  //   .withMessage("Address details is required"),
  // check("addresses.*.alias")
  //   .notEmpty()
  //   .withMessage("Address alias is required"),
  // check("addresses.*.phone")
  //   .notEmpty()
  //   .withMessage("Address phone is required")
  //   .isMobilePhone("ar-EG")
  //   .withMessage("Invalid phone number"),
  // check("addresses.*.city").notEmpty().withMessage("Address city is required"),
  // check("addresses.*.postalCode").optional(),
  check("password")
    .notEmpty()
    .withMessage("Should provide password to update profile"),
  check("image").optional().isString().withMessage("Image is a URL string"),
  checkExact(
    [],
    { locations: ["body"] },
    {
      message: (fields) => {
        const [field] = fields;
        return `Can't add ${field.path} field`;
      },
    }
  ),
  validator,
];

exports.updateUserRoleValidator = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isMongoId()
    .withMessage("Invalid id"),
  check("role")
    .notEmpty()
    .withMessage("Role is required")
    .custom(isEnumValue(["user", "admin"])),
  checkExact(
    [],
    { locations: ["body"] },
    {
      message: (fields) => {
        const [field] = fields;
        return `Can't add ${field.path} field`;
      },
    }
  ),
  validator,
];
exports.changePassValidator = [
  check("oldPass").notEmpty().withMessage("Old password is required"),
  check("confirmPass")
    .notEmpty()
    .withMessage("password confirmation is required"),
  check("newPass")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("Min length is 6 character.")
    .custom((password, { req }) => {
      if (password != req.body.confirmPass)
        throw new Error("Password Confirmation is incorrect.");
      return true;
    }),
  validator,
];
