const router = require("express").Router();
const auth = require("../controllers/auth.controller");
const authValidate = require("../utils/validators/user.validators")

router.post("/register", authValidate.register, auth.register);
router.post("/login", authValidate.login, auth.login);

module.exports = router