const server = require("./app");
const port = process.env.PORT;

const sr = server.listen(port, () =>
  console.log(`App running on Port: ${port}`)
);

process.on("unhandledRejection", (err) => {
  console.log(
    `unhandledRejection: ${err.name} | ${err.message}\n stack:${err.stack}`
  );
  sr.close(() => {
    console.log("shutting down");
    process.exit(1);
  });
});
