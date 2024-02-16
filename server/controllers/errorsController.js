module.exports = (err, req, res, next) => {
  // if (err.name && err.name === "ValidationError") {
  //   return res.status(400).json({
  //     status: "validation error",
  //   });
  // }
  return res.status(400).json({
    status: "error",
    message: err,
  });
};
