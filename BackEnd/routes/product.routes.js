const router = require("express").Router();
const Product = require("../controllers/product.controller");
const validator = require("../utils/validators/product.validators");

router
  .route("/")
  .post(validator.createValidator, Product.createProduct)
  .get(Product.getProducts);

router
  .route("/:id")
  .get(validator.getValidator, Product.getProduct)
  .put(validator.updateValidator, Product.updateProduct)
  .delete(validator.deleteValidator, Product.deleteProduct);


module.exports = router;
