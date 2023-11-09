module.exports = class ApiError extends Error {
  constructor(message, statusCode) {
    super();
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
    this.isOperational = true;
    this.message = message;
  }
};
