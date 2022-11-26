const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const products = require("../Schema/productModel");

router.get("/products", [], async (req, res) => {
  const errors = validationResult(req);
  let success = false;
  if (!errors.isEmpty()) {
    res.status(500).send(errors.array());
  }
  try {
    let Products = await products.find({});
    res.json(Products);
  } catch (error) {
    console.log(error.message);
    res.status(404).send("Data not found");
  }
});

router.get("/productdetail/:id", [], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(500).json(errors.array());
  }
  try {
    const find_one = await products.findById(req.params.id);
    res.json(find_one);
  } catch (error) {
    console.log(error.message);
    res.status(404).send("Data not found");
  }
});

module.exports = router;
