require("dotenv").config();
require("./db")();

const express = require("express");
const app = express();
const compression = require("compression");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const ApiError = require("./utils/apiError");
const globalError = require("./middleware/globalError");
const mountRoutes = require("./routes/mountRoutes");
const { webhookCheckOut } = require("./controller/order.controller");
const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

app.use(limiter);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  webhookCheckOut
);

app.use(cookieParser());
app.use(compression());
app.use(express.static("../uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      process.env.NODE_ENV === "development" && "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.get("/keep-alive", (req, res) => {
  res.status(200).json({ status: "success" });
});

mountRoutes(app);

app.all("*", (req, res, next) => {
  next(new ApiError(`can't find this route: ${req.originalUrl}`, 500));
});

app.use(globalError);

const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
require("./socket/socket")(io);

module.exports = server;
