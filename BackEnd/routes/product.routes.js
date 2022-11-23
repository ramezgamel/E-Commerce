const router = require("express").Router();
const Product = require("../controllers/product.controller");
const validator = require("../utils/validators/product.validators");
const Authorization = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

router
  .route("/")
  .post(
    upload.fields(
      [
        { name: "images", maxCount: 2 },
        { name: "coverImage", maxCount: 1 },
      ]),
    validator.createValidator,
    Authorization,
    Product.createProduct
  )
  .get(Product.getProducts);

router
  .route("/:id")
  .get(validator.getValidator, Product.getProduct)
  .put(
    upload.fields([
      { name: "images", maxCount: 2 },
      { name: "coverImage", maxCount: 1 },
    ]),
    validator.updateValidator,
    Authorization,
    Product.updateProduct
  )
  .delete(validator.deleteValidator, Authorization, Product.deleteProduct);

router.post("/addImages", upload.array("images", 2), (req, res) => {
  console.log(req.files);
  res.send(req.files);
});

module.exports = router;
