const router = require("express").Router();
const controller = require("../controller/order.controller");
const { protect, restrictTo } = require("../middleware/auth.middelware");
router.post("/", protect, controller.createOrder);
router.get("/mine", protect, controller.getMyOrders);
router.get("/:id", protect, controller.getOrderById);
router.put("/:id/pay", protect, controller.updateOrderToPaid);

//admin
router.get("/", protect, restrictTo(["admin"]), controller.getOrders);
router.patch(
  "/:id/deliver",
  protect,
  restrictTo(["admin"]),
  controller.updateOrderToDelivered
);
module.exports = router;
