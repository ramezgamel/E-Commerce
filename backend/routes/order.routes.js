const router = require("express").Router();
const controller = require("../controller/order.controller");
router.post("/", controller.createOrder);
router.get("/mine", controller.getMyOrders);

//admin
router.get("/", controller.getOrders);
router.get("/:id", controller.getOrderById);
router.patch("/:id/deliver", controller.updateOrderToDelivered);
module.exports = router;
