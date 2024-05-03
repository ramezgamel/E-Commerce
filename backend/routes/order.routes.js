const router = require("express").Router();
const controller = require("../controller/order.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");
router.use(protect);
router.post("/", controller.createOrder);
router.get("/mine", controller.getMyOrders);
router.get("/:id", controller.getOrderById);
router.put("/:id/pay", controller.updateOrderToPaid);

//admin
router.use(restrictTo(["admin"]));
router.get("/", controller.getOrders);
router.put("/:id/deliver", controller.updateOrderToDelivered);
module.exports = router;
