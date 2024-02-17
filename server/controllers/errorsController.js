module.exports = (err, req, res, next) => {
  if (err.name && err.name === "ValidationError") {
    return res.status(400).json({
      status: "validation error",
    });
  }
  const errorString = JSON.stringify(err).slice(1, -1);
  if (errorString.startsWith("DEFINED=")) {
    const messageStatus = errorString.split(" ");
    const statusCode = parseInt(messageStatus[1]);
    const messageEncoded = messageStatus[0].split("=")[1];
    const message = messageEncoded.split("-").join(" ");

    return res.status(statusCode).json({
      status: "error",
      message: message,
    });
  }
  return res.status(400).json({
    status: "error",
    message: err,
  });
};
