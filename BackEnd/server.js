const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

const dbConnection = require("./config/dbConnection");
const globalError = require("./middleware/globalError");
const ApiError = require("./utils/apiError");

const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
const subCategoryRoutes = require("./routes/subCategory.routes");
const brandRoutes = require("./routes/brand.routes");

dotenv.config();
dbConnection();

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(express.json());

// Routes
app.use("/category", categoryRoutes);
app.use("/subCategory", subCategoryRoutes);
app.use("/brand", brandRoutes);
app.use("/product", productsRoutes);
app.use("/user",authRoutes);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't get this route: ${req.originalUrl}`, 400));
});

app.use(globalError);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log("Server Running"));

process.on("unhandledRejection", (err) => {
  console.log(`UnhandledRejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Shutting down...");
    process.exit(1);
  });
});
