require("dotenv").config();
require("./db")();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const ApiError = require("./utils/apiError");
const globalError = require("./middleware/globalError");
app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
// app.use(cors({ credentials: true, origin: "http://127.0.0.1:5173" }));
const productsRoutes = require("./routes/product.routes");
const usersRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");

app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", orderRoutes);

app.all("*", (req, res, next) => {
  console.log("====== route error =======");
  next(new ApiError(`can't find this route: ${req.originalUrl}`, 500));
});
app.use(globalError);
module.exports = app;
