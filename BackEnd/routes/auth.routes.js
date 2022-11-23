const router = require("express").Router();
const auth = require("../controllers/auth.controller");
const authValidate = require("../utils/validators/user.validators");
const AuthMiddleWare = require("../middleware/auth.middleware");

router.post("/register", authValidate.register, auth.register);
router.post("/login", authValidate.login, auth.login);
router.post("/forgetPassword", auth.forgetPassword);
router.post("/resetPassword/:token", auth.resetPassword);
router.put("/profile/:id", auth.editProfile)

router.post("/setAdmin/:id", AuthMiddleWare, auth.addAdmin);


module.exports = router;
