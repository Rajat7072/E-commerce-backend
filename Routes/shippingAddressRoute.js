const express = require("express");
const router = express.Router();
const { check, body, validationResult } = require("express-validator");
const address = require("../Schema/addressModel");

router.post("/shippingAddress", [], async (req, res) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      res.status(404).json("some fucking error occured");
    }
    const {
      AdminName,
      name,
      address_one,
      address_two,
      city,
      state,
      zipcode,
      phone,
    } = req.body;

    const Shipping = await address
      .create({
        AdminName,
        name,
        address_one,
        address_two,
        city,
        state,
        zipcode,
        phone,
      })
      .then((Shipping) => res.json({ Shipping }))
      .catch((err) =>
        res.json({
          errors: err,
          success: false,
          error: "Some error occured",
        })
      );
  } catch (error) {
    res.status(500).send("server error ");
  }
});
module.exports = router;
