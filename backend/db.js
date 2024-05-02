const mongoose = require("mongoose");
const URI = process.env.DB_URI;
const connect = async () => {
  await mongoose.connect(URI);
  console.log("Data base connected:", URI);
};

module.exports = connect;
