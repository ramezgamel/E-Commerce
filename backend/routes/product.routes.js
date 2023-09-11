const router = require("express").Router();

const controller = require("../controller/products.controller");

router.get("/", controller.getProducts);
router.post("/", controller.createProduct);
router.get("/:id", controller.getProduct);
router.delete("/:id", controller.deleteProduct);
router.patch("/:id", controller.updateProduct);

module.exports = router;
