const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");
const { compare } = require("bcrypt");

exports.handleLogin = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user && compare(req.body.email, user.password)) {
    return res.status(200).json({
      status: "success",
    });
  }

  return next("Incorrect credentials");
});
