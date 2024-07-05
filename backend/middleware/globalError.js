const ApiError = require("../utils/apiError");

const ValidatorErrorHandlingDB = (err, res) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  return new ApiError(`Invalid input data, ${errors.join(". ")}`, 400);
};
const castErrorDB = (err, res) => {
  return new ApiError(`Invalid ${err.path} value : ${err.value}`, 400);
};
const duplicateFieldDB = (err, res) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/);
  return new ApiError(
    `Duplicate field value: ${value}, Please use another value`,
    400
  );
};

const errorForProduction = (err, res) => {
  let error = { ...err };
  if (err.name === "CastError") error = castErrorDB(err, res);
  if (err.code === 11000) error = duplicateFieldDB(err, res);
  if (err.name === "JsonWebTokenError")
    error = ValidatorErrorHandlingDB(err, res);
  if (err.name === "ValidationError")
    error = new ApiError(`Validation Error: ${err.message}`, 400);
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong ..!",
    });
  }
};

const errorForDev = (err, res) => {
  res.status(err.statusCode).json({
    isOperational: err.isOperational,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = function globalError(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV == "development") {
    console.log(err);
    console.log(err.stack);
    errorForDev(err, res);
  } else {
    if (err.name === "ValidatorError")
      return ValidatorErrorHandlingDB(err, res);
    errorForProduction(err, res);
  }
};
