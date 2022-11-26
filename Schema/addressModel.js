const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
  AdminName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address_one: {
    type: String,
    required: true,
  },
  address_two: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
