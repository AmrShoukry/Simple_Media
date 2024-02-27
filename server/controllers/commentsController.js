const Comment = require("../models/Comment");
const Post = require("../models/Post");
const catchAsync = require("../utils/catchAsync");
const fs = require("fs");
const saveImage = require("../utils/saveImage");

exports.handleCommenting = catchAsync(async (req, res, next) => {
  const postId = req.params.postId;
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    return next("DEFINED=No-Post-With-That-Id-Found 400");
  }
  const user = req.user;

  const createdAt = Date.now();
  const newComment = await Comment.create({
    user: user._id,
    post: postId,
    content: req.body.content,
    image: `comments-${user._id}-post-${postId}-${createdAt}.jpeg`,
    createdAt: createdAt,
  });

  post.comments.push(newComment._id);

  await post.save();

  if (req.file) {
    // prettier-ignore
    await saveImage(req, null, null, 95, `images/comments-${user._id}-post-${postId}-${createdAt}.jpeg`)
  }

  res.status(200).json({
    status: "success",
    message: "Commented on post successfully",
    data: newComment,
  });
});

exports.handleDeletingComment = catchAsync(async (req, res, next) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const post = await Post.findOne({ _id: postId });
  const comment = await Comment.findOne({ _id: commentId });
  const commentCreationDate = comment.createdAt.getTime();
  const user = req.user;

  if (!post || !comment) {
    return next("DEFINED=Comment-Or-Post-Doesn't-Exist 400");
  }

  if (!post.comments.includes(commentId)) {
    return next("DEFINED=This-Comment-Doesn't-Belong-To-The-Given-Post 400");
  }

  if (user._id.toString() !== comment.user.toString()) {
    return next("DEFINED=You-can't-delete-other-users-comments 403");
  }

  const index = post.comments.indexOf(commentId);
  if (index !== -1) {
    post.comments.splice(index, 1);
  }

  const filePath = `${__dirname}/../images/comments-${user._id}-post-${postId}-${commentCreationDate}.jpeg`;
  fs.unlink(filePath, (err) => {});

  comment.replies.forEach(async (reply) => {
    await Comment.deleteOne({ _id: reply._id });
  });

  await comment.deleteOne();
  await post.save();

  res.status(204).json({
    status: "success",
    message: "Comment Deleted successfully",
  });
});

exports.handleLikingComment = catchAsync(async (req, res, next) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const post = await Post.findOne({ _id: postId });
  const comment = await Comment.findOne({ _id: commentId });
  const user = req.user;

  if (!post || !comment) {
    return next("DEFINED=Comment-Or-Post-Doesn't-Exist 400");
  }

  if (!post.comments.includes(commentId)) {
    return next("DEFINED=This-Comment-Doesn't-Belong-To-The-Given-Post 400");
  }

  if (!comment.likes.includes(user._id)) {
    comment.likes.push(user._id);
  }

  await comment.save();

  res.status(200).json({
    status: "success",
    message: "Liked the comment successfully",
  });
});

exports.handleUnlikingComment = catchAsync(async (req, res, next) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const post = await Post.findOne({ _id: postId });
  const comment = await Comment.findOne({ _id: commentId });
  const user = req.user;

  if (!post || !comment) {
    return next("DEFINED=Comment-Or-Post-Doesn't-Exist 400");
  }

  if (!post.comments.includes(commentId)) {
    return next("DEFINED=This-Comment-Doesn't-Belong-To-The-Given-Post 400");
  }

  const index = comment.likes.indexOf(user._id);
  if (index !== -1) {
    comment.likes.splice(index, 1);
  }

  await comment.save();

  res.status(200).json({
    status: "success",
    message: "unliked the comment successfully",
  });
});

exports.handleCommentReplying = catchAsync(async (req, res, next) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const post = await Post.findOne({ _id: postId });
  const comment = await Comment.findOne({ _id: commentId });
  const user = req.user;

  if (!post || !comment) {
    return next("DEFINED=Comment-Or-Post-Doesn't-Exist 400");
  }

  // if (!post.comments.includes(commentId)) {
  //   return next("DEFINED=This-Comment-Doesn't-Belong-To-The-Given-Post 400")
  // }

  const createdAt = Date.now();
  const newReply = await Comment.create({
    user: user._id,
    post: postId,
    content: req.body.content,
    image: `replies-${user._id}-comments-${commentId}-post-${postId}-${createdAt}.jpeg`,
    createdAt: createdAt,
    parentComment: comment._id,
  });

  comment.replies.push(newReply._id);
  await comment.save();

  if (req.file) {
    // prettier-ignore
    await saveImage(req, null, null, 95, `images/replies-${user._id}-comments-${commentId}-post-${postId}-${createdAt}.jpeg`)
  }

  res.status(200).json({
    status: "success",
    message: "Replied on comment successfully",
    data: newReply,
  });
});

exports.handleCommentUnreplying = catchAsync(async (req, res, next) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const replyId = req.params.replyId;
  const post = await Post.findOne({ _id: postId });
  const comment = await Comment.findOne({ _id: commentId });
  const reply = await Comment.findOne({
    _id: replyId,
    parentComment: comment._id,
  });
  const replyCreationDate = reply.createdAt.getTime();
  const user = req.user;

  if (!post || !comment || !reply) {
    return next("DEFINED=Comment-Or-Post-Or-Reply-Doesn't-Exist 400");
  }

  if (!post.comments.includes(commentId)) {
    return next("DEFINED=This-Comment-Doesn't-Belong-To-The-Given-Post 400");
  }

  if (!comment.replies.includes(replyId)) {
    return next("DEFINED=This-Reply-Doesn't-Belong-To-The-Given-Comment 400");
  }

  if (user._id.toString() !== reply.user.toString()) {
    return next("DEFINED=You-can't-delete-other-users-comments 403");
  }

  comment.replies.forEach(async (reply) => {
    await Comment.deleteOne({ _id: reply._id });
  });

  const index = comment.replies.indexOf(replyId);
  if (index !== -1) {
    comment.replies.splice(index, 1);
  }

  const filePath = `${__dirname}/../images/replies-${user._id}-comments-${commentId}-post-${postId}-${replyCreationDate}.jpeg`;
  fs.unlink(filePath, (err) => {});

  await reply.deleteOne();
  await comment.save();

  res.status(204).json({
    status: "success",
    message: "Reply Deleted successfully",
  });
});

exports.handleLikingReply = catchAsync(async (req, res, next) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const replyId = req.params.replyId;
  const post = await Post.findOne({ _id: postId });
  const comment = await Comment.findOne({ _id: commentId });
  const reply = await Comment.findOne({
    _id: replyId,
    parentComment: comment._id,
  });
  const user = req.user;

  if (!post || !comment || !reply) {
    return next("DEFINED=Comment-Or-Post-Or-Reply-Doesn't-Exist 400");
  }

  if (!post.comments.includes(commentId)) {
    return next("DEFINED=This-Comment-Doesn't-Belong-To-The-Given-Post 400");
  }

  if (!comment.replies.includes(replyId)) {
    return next("DEFINED=This-Reply-Doesn't-Belong-To-The-Given-Comment 400");
  }

  if (!reply.likes.includes(user._id)) {
    reply.likes.push(user._id);
  }

  await reply.save();

  res.status(200).json({
    status: "success",
    message: "Liked the Reply successfully",
  });
});

exports.handleUnlikingReply = catchAsync(async (req, res, next) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const replyId = req.params.commentId;
  const post = await Post.findOne({ _id: postId });
  const comment = await Comment.findOne({ _id: commentId });
  const reply = await Comment.findOne({
    _id: replyId,
    parentComment: comment._id,
  });
  const user = req.user;

  if (!post || !comment || !reply) {
    return next("DEFINED=Comment-Or-Post-Or-Reply-Doesn't-Exist 400");
  }

  if (!post.comments.includes(commentId)) {
    return next("DEFINED=This-Comment-Doesn't-Belong-To-The-Given-Post 400");
  }

  if (!comment.replies.includes(replyId)) {
    return next("DEFINED=This-Reply-Doesn't-Belong-To-The-Given-Comment 400");
  }

  const index = reply.likes.indexOf(user._id);
  if (index !== -1) {
    reply.likes.splice(index, 1);
  }

  await reply.save();

  res.status(200).json({
    status: "success",
    message: "Unliked the Reply successfully",
  });
});

exports.getPostComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find({
    post: req.params.postId,
    parentComment: null,
  })
    .populate({
      path: "user",
      select: "username",
    })
    .select("content image");

  res.status(200).json({
    status: "success",
    data: comments,
  });
});

exports.getCommentLikes = catchAsync(async (req, res, next) => {
  const comment = await Comment.find({ _id: req.params.commentId })
    .populate({
      path: "likes",
      select: "username",
    })
    .select("likes");

  res.status(200).json({
    status: "success",
    data: comment,
  });
});

exports.getCommentReplies = catchAsync(async (req, res, next) => {
  const comment = await Comment.find({ _id: req.params.commentId })
    .select("replies")
    .populate({
      path: "replies",
      select: "content image user",
    });

  res.status(200).json({
    status: "success",
    data: comment.replies,
  });
});
