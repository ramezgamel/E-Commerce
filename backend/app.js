require("dotenv").config();
require("./db")();
const http = require("http");

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
// keep server alive
const keepAwake = () => {
  const options = {
    hostname: "localhost",
    port: 5000,
    path: "/keep-alive",
    method: "GET",
  };
  const req = http.request(options, (res) => {
    console.log(`Keep-alive request status: ${res.statusCode}`);
  });
  req.on("error", (error) => {
    console.log(error);
    console.error("Error sending keep-alive request:", error);
  });
  req.end();
};
setInterval(keepAwake, 1000 * 60 * 10);
app.get("/keep-alive", (req, res) => {
  res.sendStatus(200);
});

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
