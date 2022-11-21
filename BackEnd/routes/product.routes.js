const router = require("express").Router();
const Product = require("../controllers/product.controller");
const validator = require("../utils/validators/product.validators");
const Authorization = require("../middleware/auth.middleware");

router
  .route("/")
  .post(validator.createValidator, Authorization, Product.createProduct)
  .get(Product.getProducts);

router
  .route("/:id")
  .get(validator.getValidator, Product.getProduct)
  .put(validator.updateValidator, Authorization, Product.updateProduct)
  .delete(validator.deleteValidator, Authorization, Product.deleteProduct);


module.exports = router;
