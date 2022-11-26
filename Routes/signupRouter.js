const express = require("express");
const router = express.Router();
const { check, body, validationResult } = require("express-validator");
const user = require("../Schema/user");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post(
  "/signupuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    check("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long")
      .matches(/\d/)
      .withMessage("must contain a number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    try {
      if (!errors) {
        res.status(404).json("some error occured");
      }
      const { name, email, password } = req.body;
      const data = {
        create_id: {
          val_id: user._id,
        },
      };
      var salt = bcrypt.genSaltSync(10);
      const securePassword = await bcrypt.hash(password, salt);
      const token = jwt.sign(data, process.env.REACT_APP_JWT_SECRET);
      const Signup = await user
        .create({
          name,
          email,
          password: securePassword,
        })
        .then((user) => res.json({ token }))
        .catch((err) =>
          res.json({
            errors: err,
            success: false,
            error: "Email already exist",
          })
        );
    } catch (error) {
      res.status(500).send("server error ");
    }
  }
);
module.exports = router;
