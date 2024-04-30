const validator = require("../middleware/validator");
const { check, param, checkExact } = require("express-validator");
const Category = require("../model/Category");
const ApiError = require("../utils/apiError");

const isArrayOfStringValidator = (value) => {
  if (!Array.isArray(value)) {
    throw new Error("Field must be an array");
  }
  if (value.some((item) => typeof item !== "string")) {
    throw new Error("Each element in the array must be a string");
  }
  return true;
};
const checkCategory = async (val, { req }) => {
  const cat = await Category.findById(req.body.category);
  if (!cat) throw new ApiError("No category with this id", 400);
  return true;
};

exports.createValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 32 })
    .withMessage("Name length must be 3 min and 32 max"),
  check("images")
    .custom(isArrayOfStringValidator)
    .withMessage("Accept images as array of string")
    .notEmpty()
    .withMessage("Must be at least One image for product"),
  check("category")
    .notEmpty()
    .withMessage("Product must be belong to category")
    .isMongoId()
    .withMessage("Invalid ID")
    .custom(checkCategory),
  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Only string value for description"),
  check("brand").optional(),
  check("price").notEmpty().withMessage("Price is required"),
  check("countInStock").notEmpty().withMessage("Count in stock is required"),
  check("discount").optional(),
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
  (req, res, next) => {
    req.body.user = req.user._id;
    next();
  },
  validator,
];

exports.updateValidator = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isMongoId()
    .withMessage("Invalid ID"),
  check("name")
    .optional()
    .isLength({ min: 3, max: 32 })
    .withMessage("Name length must be 3 min and 32 max"),
  check("images")
    .optional()
    .custom(isArrayOfStringValidator)
    .isLength({ min: 1, max: 5 })
    .withMessage("Must be at least One image for product"),
  check("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID")
    .custom(checkCategory),
  check("description")
    .optional()
    .isString()
    .withMessage("Only string value for description"),
  check("brand").optional(),
  check("price").optional(),
  check("countInStock").optional(),
  check("discount").optional(),
  checkExact(
    [],
    { locations: ["body"] },
    {
      message: (fields) => {
        console.log(fields);
        const [field] = fields;
        return `Can't add ${field.path} field`;
      },
    }
  ),
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
