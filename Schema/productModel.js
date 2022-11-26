const mongoose = require("mongoose");
const { Schema } = mongoose;

const userReview = new Schema({
  //   name: {
  //     type: String,
  //     required: true,
  //   },
  //   rating: {
  //     type: Number,
  //     required: true,
  //   },
  //   commemt: {
  //     type: Number,
  //     required: true,
  //   },
  rate: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});
const productSchema = new Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  rating: [userReview],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
