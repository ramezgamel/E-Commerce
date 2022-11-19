const fs = require("fs");
const dotenv = require("dotenv");
const Product = require("../../models/product.model");
const dbConnection = require("../../config/dbConnection");

dotenv.config({path:"../../.env"});

dbConnection();

const products = JSON.parse(fs.readFileSync("./products.json"));

const insertData = async () => {
  try{
    console.log()
    await Product.create(products);
    console.log("Products Inserted");
    process.exit();
  }catch(err) {
    console.log(err)
  }
};

const deleteData = async () => {
  try{
    await Product.deleteMany();
    console.log("Products Deleted");
    process.exit();
  }catch(err) {
    console.log(err)
  }
};

if(process.argv[2] == "-i") {
  insertData()
}
if(process.argv[2] == "-d") {
  deleteData()
}
