const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");

async function getUser(req, res, action) {
  const data = await User.find({ _id: req.params.userId }).select(action);

  return res.status(200).json({
    status: "success",
    data: data,
  });
}

exports.getUserFollowers = catchAsync(async (req, res, next) => {
  return await getUser(req, res, "followers");
});

exports.getUserFollowing = catchAsync(async (req, res, next) => {
  return await getUser(req, res, "following");
});

exports.getUserBlockers = catchAsync(async (req, res, next) => {
  return await getUser(req, res, "blockers");
});

exports.getUserBlocking = catchAsync(async (req, res, next) => {
  return await getUser(req, res, "blocking");
});

exports.getUserData = catchAsync(async (req, res, next) => {
  const data = await User.find({ _id: req.params.userId }).select(
    "username profilePicture"
  );

  return res.status(200).json({
    status: "success",
    data: data,
  });
});
