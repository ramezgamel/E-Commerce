const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

module.exports = class Auth {
  static register = asyncHandler(async (req, res) => {
    if (req.body.isAdmin) throw new ApiError("Can't register as Admin", 400);
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) throw new ApiError(`User already registered!!`, 400);
    user = new UserModel({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();

    const token = user.genAuthToken();

    res.header("x-auth-token", token);
    res
      .status(201)
      .send({ userName: req.body.userName, email: req.body.email });
  });

  static login = asyncHandler(async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) throw new ApiError("Invalid email or password", 403);
    const validPass = await user.checkPass(req.body.password);
    if (!validPass) throw new ApiError("Invalid email or password", 403);
    const token = user.genAuthToken();
    res.header("x-auth-token", token);
    res.status(200).send("Logged In");
  });

  static addAdmin = asyncHandler(async (req, res) => {
    UserModel.findByIdAndUpdate(
      req.params.id,
      { isAdmin: true },
      function (err, data) {
        if (!err) {
          if (data) res.status(200).send("User is set to Admin..");
          else res.status(400).send("User Not Found..");
        } else {
          res.status(500).send("Internal Server Error..");
        }
      }
    );
  });

  static forgetPassword = asyncHandler(async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) throw new ApiError(`No user for this email: ${req.body.email}`);
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWTSEC,
      { expiresIn: "5m" }
    );
    const link = `http://localhost:4444/user/resetPassword/${token}`;
    // send link here by email
    let transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false, // true for 465, false for other ports
      auth: {
        user: "ramezgamel95@gmail.com", // generated ethereal user
        pass: "oxlrgcmfkuwknuxm", // generated ethereal password
      },
    });
    var mailOption = {
      from: "ramezgamel95@gmail.com",
      to: user.email,
      subject: "Password reset",
      text: `there is a link to reset ur password ${link}`,
    };
    transporter.sendMail(mailOption, function(err, info){
      if(err) console.log(err);
      else console.log("Email Sent" + info.response)
    });

    res.send("Done");
  });

  static resetPassword = asyncHandler(async (req, res) => {
    const decoded = jwt.verify(req.params.token, process.env.JWTSEC);
    const user = await UserModel.findById(decoded.id);
    if (!user) throw new ApiError("User isn't Exists", 400);
    if (req.body.password != req.body.confirmPassword)
      throw new ApiError("Password doesn't match", 400);
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    await UserModel.findByIdAndUpdate(user.id, { password: hashPassword });
    res.status(200).send("Password Updated");
  });
};
