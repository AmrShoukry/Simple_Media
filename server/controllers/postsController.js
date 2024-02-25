const Post = require("../models/Post");
const catchAsync = require("../utils/catchAsync");
const fs = require("fs");
const saveImage = require("../utils/saveImage");

exports.handleCreatingPost = catchAsync(async (req, res, next) => {
  const createdAt = Date.now();
  const newPost = await Post.create({
    user: req.user._id,
    content: req.body.content,
    image: `posts-${req.user._id}-${createdAt}.jpeg`,
    createdAt: createdAt,
  });

  const user = req.user;

  user.posts.push(newPost._id);

  await user.save();

  if (req.file) {
    // prettier-ignore
    await saveImage(req, null, null, 95, `images/posts-${req.user._id}-${createdAt}.jpeg`)
  }

  res.status(201).json({
    status: "success",
    message: "created successfully",
  });
});

exports.handleDeletingPost = catchAsync(async (req, res, next) => {
  const postId = req.params.postId;
  const post = await Post.findOne({ _id: postId });
  const postCreationDate = post.createdAt.getTime();
  const user = req.user;

  if (user._id.toString() !== post.user.toString()) {
    return next("DEFINED=You-can't-delete-other-users-posts 403");
  }

  await post.deleteOne();

  const index = user.posts.indexOf(postId);
  if (index !== -1) {
    user.posts.splice(index, 1);
  }

  await user.save();

  const filePath = `${__dirname}/../images/posts-${user._id}-${postCreationDate}.jpeg`;
  fs.unlink(filePath, (err) => {});

  return res.status(204).json({
    status: "success",
    message: "Deleted Successfully",
  });
});

exports.handleLikingPost = catchAsync(async (req, res, next) => {
  const postId = req.params.postId;
  const post = await Post.findOne({ _id: postId });
  const user = req.user;

  if (!post.likes.includes(user._id)) {
    post.likes.push(user._id);
  }

  await post.save();

  return res.status(200).json({
    status: "success",
    message: "Liked Successfully",
  });
});

exports.handleUnlikingPost = catchAsync(async (req, res, next) => {
  const postId = req.params.postId;
  const post = await Post.findOne({ _id: postId });
  const user = req.user;

  const index = post.likes.indexOf(user._id);
  if (index !== -1) {
    post.likes.splice(index, 1);
  }

  await post.save();

  return res.status(200).json({
    status: "success",
    message: "Unliked Successfully",
  });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).json({
    status: "success",
    data: posts,
  });
});

exports.getUserPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ user: req.params.userId });

  res.status(200).json({
    status: "success",
    data: posts,
  });
});

exports.getMyPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ user: req.user._id });

  res.status(200).json({
    status: "success",
    data: posts,
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({ _id: req.params.postId });

  res.status(200).json({
    status: "success",
    data: post,
  });
});

exports.getPostLikes = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({ _id: req.params.postId }).populate({
    path: "likes",
    select: "username",
  });

  res.status(200).json({
    status: "success",
    data: post.likes,
  });
});
