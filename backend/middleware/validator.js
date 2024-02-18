const { validationResult } = require("express-validator");
const ApiError = require("../utils/apiError");

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (process.env.NODE_ENV === "development")
      res
        .status(400)
        .json({ msg: errors.errors[0].msg, path: errors.errors[0].path });
    throw new ApiError(errors.errors[0].msg, 400);
  }
  next();
};

module.exports = validator;
