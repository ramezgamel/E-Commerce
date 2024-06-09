const router = require("express").Router();
const controller = require("../controller/auth.controller");
const {
  registerValidator,
  loginValidator,
} = require("../validators/user.validator");

router.post("/register", registerValidator, controller.register);
router.post("/login", loginValidator, controller.login);
router.post("/forgetPassword", controller.forgetPassword);
router.post("/verifyCode", controller.verifyResetCode);
router.get("/verifyToken", controller.verifyToken);
router.put("/resetPassword", controller.resetPassword);

module.exports = router;
