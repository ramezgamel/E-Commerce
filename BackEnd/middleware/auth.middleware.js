const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

AuthMiddleWare = asyncHandler(async (req, res, nxt) => {
  const token = req.header("x-auth-token");
  if(!token) throw new ApiError("Access Denied...", 401)
  const decodedToken = jwt.verify(req.header("x-auth-token"), process.env.JWTSEC);
  if(!decodedToken.isAdmin) throw new ApiError(`Only admins can get this routes`, 401) ;
  nxt()
});

module.exports = AuthMiddleWare;
