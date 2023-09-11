const router = require("express").Router();
const controller = require("../controller/user.controller");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
// auth
router.get("/profile", controller.getProfile);
router.put("/profile", controller.updateUser);
//admin
router.get("/", controller.getUsers);
router.put("/:id", controller.updateUserById);
router.delete("/:id", controller.deleteUserById);

module.exports = router;
