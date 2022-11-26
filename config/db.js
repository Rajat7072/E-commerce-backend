require("colors");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.REACT_APP_CONN_URL);
    console.log(
      `MongoDB connect successfully to PORT ${process.env.REACT_APP_PORT}`
        .rainbow
    );
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

module.exports = connectDB;
