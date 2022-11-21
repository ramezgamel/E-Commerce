const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const UserModel = require("../models/user.model");

module.exports = class Auth {
  static register = asyncHandler(async(req, res) => {
    if(req.body.isAdmin) throw new ApiError("Can't register as Admin", 400)
    let user = await UserModel.findOne({email: req.body.email});
    if(user) throw new ApiError(`User already registered!!`, 400);
    user = new UserModel({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })
    await user.save();

    const token = user.genAuthToken();

    res.header("x-auth-token", token)
    res.status(201).send({userName: req.body.userName, email: req.body.email})
  });

  static login = asyncHandler(async (req, res) => {
    const user = await UserModel.findOne({email: req.body.email});
    if(!user) throw new ApiError("Invalid email or password", 403);
    const validPass = await user.checkPass(req.body.password);
    if(!validPass) throw new ApiError("Invalid email or password", 403);
    const token = user.genAuthToken();
    res.header("x-auth-token", token)
    res.status(200).send("Logged In")
  })
}