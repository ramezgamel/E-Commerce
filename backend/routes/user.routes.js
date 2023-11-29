const router = require("express").Router();
const controller = require("../controller/user.controller");
const { protect, restrictTo } = require("../middleware/auth.middelware");
const upload = require("../middleware/upload");
const cloudinary = require("../middleware/cloudinary");

router.post(
  "/register",
  upload.single("image"),
  cloudinary,
  controller.register
);
router.post("/login", controller.login);
router.post("/logout", protect, controller.logout);
router.post("/forgetPassword", controller.forgetPassword);
router.post("/resetPassword/:resetToken", controller.resetPassword);
// auth
router.post("/notifications/:id", protect, controller.markAsRead);
router.get("/notifications", protect, controller.myNotification);
router.put(
  "/profile",
  upload.single("image"),
  cloudinary,
  protect,
  controller.updateUser
);
//admin
router.get("/", protect, restrictTo(["admin"]), controller.getUsers);
router.put("/:id", protect, restrictTo(["admin"]), controller.updateUserById);
router.delete(
  "/:id",
  protect,
  restrictTo(["admin"]),
  controller.deleteUserById
);

module.exports = router;
