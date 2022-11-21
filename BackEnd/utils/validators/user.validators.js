const validator = require("../../middleware/validator");
const { check } = require("express-validator");

module.exports = class Auth {
  static register = [
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),
    check("userName").notEmpty().withMessage("User name is required"),
    check("password").notEmpty().withMessage("Password is required"),
    validator,
  ];

  static login = [
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),
    check("password").notEmpty().withMessage("Password is required"),
    validator,
  ];
};