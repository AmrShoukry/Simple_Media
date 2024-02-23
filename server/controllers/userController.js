const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");
const { hash, compare } = require("bcrypt");
const { upload } = require("../utils/uploadImage");
const sharp = require("sharp");
const fs = require("fs");

async function getUser(req, res, action) {
  const data = await User.find({'_id': req.params.userId}).populate({
    path: action,
    select: 'username'
  }).select(action)

  res.status(200).json({
    status: 'success',
    data: data
  })

}

exports.getUserFollowers = catchAsync(async (req, res, next) => {
  return await getUser(req, res, 'followers')
})

exports.getUserFollowing = catchAsync(async (req, res, next) => {
  return await getUser(req, res, 'following')
})

exports.getUserBlockers = catchAsync(async (req, res, next) => {
  return await getUser(req, res, 'blockers')
})

exports.getUserBlocking = catchAsync(async (req, res, next) => {
  return await getUser(req, res, 'blocking')
})