const router = require("express").Router();

const controller = require("../controllers/brand.controller");
const brandValidator = require("../utils/validators/brand.validators");
const Authorization = require("../middleware/auth.middleware");
const upload  = require("../middleware/upload.middleware");

router
  .route("/")
  .post(
    upload.single("image"),
    brandValidator.createBrandValidator,
    Authorization,
    controller.createBrand
  )
  .get(controller.getBrands);

router
  .route("/:id")
  .get(brandValidator.getBrandValidator, controller.getBrand)
  .put(
    upload.single("image"),
    brandValidator.updateBrandValidator,
    Authorization,
    controller.updateBrand
  )
  .delete(
    brandValidator.deleteBrandValidator,
    Authorization,
    controller.deleteBrand
  );

module.exports = router;
