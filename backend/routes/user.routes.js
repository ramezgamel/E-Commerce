const router = require("express").Router();
const controller = require("../controller/user.controller");
const { protect, restrictTo } = require("../middleware/auth.middelware");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
// auth
router.put("/profile", protect, controller.updateUser);
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
