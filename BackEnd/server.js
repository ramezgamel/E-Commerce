const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan")

const dbConnection = require("./config/dbConnection");
const productsRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
const subCategoryRoutes = require("./routes/subCategory.routes");
const brandRoutes = require("./routes/brand.routes")
const ApiError = require("./utils/apiError");
const globalError = require("./middleware/globalError")

dotenv.config();
dbConnection();

const app = express();
if(process.env.NODE_ENV === "development"){
  app.use(morgan('dev'))
}

app.use(express.json());

// Routes
app.use("/category",categoryRoutes);
app.use("/subCategory",subCategoryRoutes);
app.use("/brand", brandRoutes);
app.use("/product",productsRoutes);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't get this route: ${req.originalUrl}`, 400))
})

app.use(globalError);



const port = process.env.PORT || 4100;
const server = app.listen(port, () => console.log("Server Running"));

process.on("unhandledRejection", (err) => {
  console.log(`UnhandledRejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Shutting down...")
    process.exit(1)
  })
})