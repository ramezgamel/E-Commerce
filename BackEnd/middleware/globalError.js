const globalError = (err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    sendErrorForProduction(err, res);
  }
};

const sendErrorForDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorForProduction = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = globalError;
