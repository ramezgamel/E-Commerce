const router = require("express").Router();

const controller = require("../controllers/brand.controller");
const brandValidator = require("../utils/validators/brand.validators");

router
  .route("/")
  .post(brandValidator.createBrandValidator, controller.createBrand)
  .get(controller.getBrands);

router
  .route("/:id")
  .get(brandValidator.getBrandValidator, controller.getBrand)
  .put(brandValidator.updateBrandValidator, controller.updateBrand)
  .delete(brandValidator.deleteBrandValidator, controller.deleteBrand);

module.exports = router;
