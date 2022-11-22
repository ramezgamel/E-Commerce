const router = require("express").Router();
const auth = require("../controllers/auth.controller");
const authValidate = require("../utils/validators/user.validators");
const AuthMiddleWare = require("../middleware/auth.middleware");

router.post("/register", authValidate.register, auth.register);
router.post("/login", authValidate.login, auth.login);

router.post("/setAdmin/:id", AuthMiddleWare, auth.addAdmin);

router.post("/forgetPassword", auth.forgetPassword);
router.post("/resetPassword/:token", auth.resetPassword);

module.exports = router;
