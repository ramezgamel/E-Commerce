require("dotenv").config();
require("./db")();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const ApiError = require("./utils/apiError");
const globalError = require("./middleware/globalError");
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.static("../uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
const mountRoutes = require("./routes/mountRoutes");
mountRoutes(app);

app.all("*", (req, res, next) => {
  next(new ApiError(`can't find this route: ${req.originalUrl}`, 500));
});
app.use(globalError);

const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
require("./socket/socket")(io);

module.exports = server;
