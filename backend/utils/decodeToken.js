const jwt = require("jsonwebtoken");
module.exports.decodeToken = async (token) => {
  const sec = process.env.SEC_JWT;
  const decoded = await jwt.verify(token, sec);
  return decoded;
};
