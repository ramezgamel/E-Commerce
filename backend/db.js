const mongoose = require("mongoose");
const URI = process.env.DB_URI;
const connect = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Data base connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connect;
