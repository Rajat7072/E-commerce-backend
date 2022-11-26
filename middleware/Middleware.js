const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.REACT_APP_NODE_ENV === "production" ? null : err.stack,
  });
  next();
};
module.exports = { errorHandler };
