const mongoose = require("mongoose");
const orderModal = require("./Schema/orderModel");
const productModal = require("./Schema/productModel");
const user = require("./Schema/user");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const sample = require("./data/sample.json");
const User = require("./data/users");
require("colors");

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await orderModal.deleteMany();
    await productModal.deleteMany();
    await user.deleteMany();
    console.log("Data will insert");
    const createUser = await user.insertMany(User);
    const adminUser = createUser[0]._id;
    const sampleData = sample.map((product) => {
      return { ...product, User: adminUser };
    });
    const product_detail = await productModal.insertMany(sampleData);
    console.log("Data inserted Successfully");
    process.exit();
  } catch (error) {
    console.log("you are inside error log");
    console.log(`${error}`);
    process.exit(1);
  }
};
const deleteData = async () => {
  try {
    await orderModal.deleteMany();
    await productModal.deleteMany();
    await user.deleteMany();
    console.log("Data deleted successfully".red.inverse);
  } catch (error) {
    console.log(`${error}`.yellow.inverse);
  }
};

if (process.argv[2] == "-d") {
  deleteData();
} else {
  importData();
}
