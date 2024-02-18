const router = require("express").Router();
const controller = require("../controller/user.controller");
const { protect, restrictTo } = require("../middleware/auth.middelware");
const {
  registerValidator,
  loginValidator,
  updateUserValidator,
} = require("../validators/user.validator");

router.post("/register", registerValidator, controller.register);
router.post("/login", loginValidator, controller.login);
router.post("/logout", protect, controller.logout);
router.post("/forgetPassword", controller.forgetPassword);
router.post("/resetPassword/:resetToken", controller.resetPassword);
// auth
router.post("/notifications/:id", protect, controller.markAsRead);
router.get("/notifications", protect, controller.myNotification);
router.put("/profile", protect, updateUserValidator, controller.updateUser);
//admin
router.get("/", protect, restrictTo(["admin"]), controller.getUsers);
router.put(
  "/:id",
  protect,
  updateUserValidator,
  restrictTo(["admin"]),
  controller.updateUserById
);
router.delete(
  "/:id",
  protect,
  restrictTo(["admin"]),
  controller.deleteUserById
);

module.exports = router;
