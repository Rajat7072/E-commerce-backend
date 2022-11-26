const express = require("express");
const router = express.Router();
const { check, body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../Schema/user");

router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    check("password").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success, errors: "Invalid Credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Password Invalid Credentials" });
      }
      const data = {
        create_id: {
          val_id: user._id,
        },
      };
      var token = jwt.sign(data, process.env.REACT_APP_JWT_SECRET);
      res.json({ success: true, token, isAdmin: user.isAdmin });
    } catch (error) {
      res.status(500).json("Server Error");
    }
  }
);

module.exports = router;
