var jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send("Please enter valid Authorization");
  }
  try {
    const decode = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
    if (!decode) {
      res.status(401).send("Please verify valid Authorization");
    }
    req.data = decode.create_id;
    next();
  } catch (error) {
    res.status(408).send("some error occured");
  }
};
module.exports = authMiddleware;
