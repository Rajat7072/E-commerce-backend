const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
var jwt = require("jsonwebtoken");
const sign = require("../Schema/user");

router.post("/auth", authMiddleware, async (req, res) => {
  try {
    const user_id = req.data.val_id;
    const user = await sign.findById(user_id).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).json("server error");
  }
});

module.exports = router;
