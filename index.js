const express = require("express");
const app = express();
var cors = require("cors");
const { errorHandler } = require("./middleware/Middleware");
//const products = require("./data/sample");
const port = 8080;
var cors = require("cors");
require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const products = require("./Routes/ProductRouter");
const loginUser = require("./Routes/LoginRouter");
const loginAuth = require("./Routes/LoginAuth");
const signup = require("./Routes/signupRouter");
const shipping = require("./Routes/shippingAddressRoute");
const stripe = require("./Routes/stripe");

//Dotenv
dotenv.config();
//Cors
app.use(cors());
//connecting Data Base
connectDB();
//error handler
app.use(errorHandler);
//jason response
app.use(express.json());
//Cors
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/ProductRouter", products);
app.use("/api/id", products);
app.use("/api/user", loginUser);
app.use("/api/user/login", loginAuth);
app.use("/api/user/signup", signup);
app.use("/api", shipping);
app.use("/api/stripe", stripe);

app.listen(process.env.PORT || port, () => {
  console.log(
    `http://localhost:${process.env.REACT_APP_PORT} and mode is ${process.env.REACT_APP_NODE_ENV}`
      .inverse
  );
});
