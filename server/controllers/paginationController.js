const Post = require("../models/Post");
const catchAsync = require("../utils/catchAsync");

exports.getAllPaginatedPosts = catchAsync(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const startIndex = (page - 1) * limit;

  const posts = await Post.find().skip(startIndex).limit(limit);

  res.status(200).json({
    status: "success",
    data: posts,
  });
});

exports.getUserPaginatedPosts = catchAsync(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const startIndex = (page - 1) * limit;

  const posts = await Post.find({ user: req.params.userId })
    .skip(startIndex)
    .limit(limit);

  res.status(200).json({
    status: "success",
    data: posts,
  });
});

exports.getMyPaginatedPosts = catchAsync(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const startIndex = (page - 1) * limit;

  const posts = await Post.find({ user: req.user._id })
    .skip(startIndex)
    .limit(limit);

  res.status(200).json({
    status: "success",
    data: posts,
  });
});

async function getPaginatedUser(req, res, action) {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const startIndex = (page - 1) * limit;

  const data = await User.find({ _id: req.params.userId })
    .select(action)
    .skip(startIndex)
    .limit(limit);

  return res.status(200).json({
    status: "success",
    data: data,
  });
}

exports.getUserPaginatedFollowers = catchAsync(async (req, res, next) => {
  return await getPaginatedUser(req, res, "followers");
});

exports.getUserPaginatedFollowing = catchAsync(async (req, res, next) => {
  return await getPaginatedUser(req, res, "following");
});

exports.getUserPaginatedBlockers = catchAsync(async (req, res, next) => {
  return await getPaginatedUser(req, res, "blockers");
});

exports.getUserPaginatedBlocking = catchAsync(async (req, res, next) => {
  return await getPaginatedUser(req, res, "blocking");
});

async function getMyPopulated(req, res, action) {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const startIndex = (page - 1) * limit;

  const data = await User.find({ _id: req.user._id })
    .populate({
      path: action,
      select: "username",
    })
    .select(action)
    .skip(startIndex)
    .limit(limit);

  res.status(200).json({
    status: "success",
    data: data,
  });
}

exports.getMyPopulatedFollowers = catchAsync(async (req, res, next) => {
  return await getMyPopulated(req, res, "followers");
});

exports.getMyPopulatedFollowing = catchAsync(async (req, res, next) => {
  return await getMyPopulated(req, res, "following");
});

exports.getMyPopulatedBlockers = catchAsync(async (req, res, next) => {
  return await getMyPopulated(req, res, "blockers");
});

exports.getMyPopulatedBlocking = catchAsync(async (req, res, next) => {
  return await getMyPopulated(req, res, "blocking");
});

exports.getPostPopulatedComments = catchAsync(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const startIndex = (page - 1) * limit;

  const comments = await Comment.find({
    post: req.params.postId,
    parentComment: null,
  })
    .select("content image")
    .skip(startIndex)
    .limit(limit);

  res.status(200).json({
    status: "success",
    data: comments,
  });
});

exports.getCommentPopulatedLikes = catchAsync(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const startIndex = (page - 1) * limit;

  const comment = await Comment.find({ _id: req.params.commentId })
    .select("likes")
    .skip(startIndex)
    .limit(limit);

  res.status(200).json({
    status: "success",
    data: comment,
  });
});

exports.getCommentPopulatedReplies = catchAsync(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const startIndex = (page - 1) * limit;

  const comment = await Comment.find({ _id: req.params.commentId })
    .select("replies")
    .skip(startIndex)
    .limit(limit);

  res.status(200).json({
    status: "success",
    data: comment.replies,
  });
});
