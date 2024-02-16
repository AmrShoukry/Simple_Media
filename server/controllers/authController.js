const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");

exports.handleLogin = catchAsync(async (req, res, next) => {
  const user = await User.findOne({});

  if (user) {
    return res.status(200).json({
      status: "success",
    });
  }

  return next("User not found");
});
