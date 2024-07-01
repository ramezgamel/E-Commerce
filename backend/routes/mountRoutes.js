const productsRoutes = require("./product.routes");
const usersRoutes = require("./user.routes");
const orderRoutes = require("./order.routes");
const chartRoutes = require("./chart.routes");
const categoryRoutes = require("./category.routes");
const wishListRoutes = require("./wishList.routes");
const addressesRoutes = require("./addresses.routes");
const couponsRoutes = require("./coupon.routes");
const cartRoutes = require("./cart.routes");
const cloudinary = require("../middleware/cloudinary");
const upload = require("../middleware/upload");
const multer = require("multer");

const mountRoutes = (app) => {
  app.use("/api/products", productsRoutes);
  app.use("/api/users", usersRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/chart", chartRoutes);
  app.use("/api/category", categoryRoutes);
  app.use("/api/wishList", wishListRoutes);
  app.use("/api/addresses", addressesRoutes);
  app.use("/api/coupons", couponsRoutes);
  app.use("/api/cart", cartRoutes);
  app.post(
    "/api/uploadSingle",
    upload.single("image"),
    (err, req, res, next) => {
      if (err instanceof multer.MulterError) {
        res.status(400).send({ error: err.message });
      } else if (err) {
        res.status(500).send({ error: err });
      }
      next();
    },
    cloudinary
  );
  app.post(
    "/api/uploadMulti",
    upload.array("images", 10),
    (err, req, res, next) => {
      if (err instanceof multer.MulterError) {
        res.status(400).send({ error: err.message });
      } else if (err) {
        res.status(500).send({ error: err });
      }
      next();
    },
    cloudinary
  );
};
module.exports = mountRoutes;
