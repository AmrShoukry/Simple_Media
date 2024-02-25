const { Router } = require("express");
const {
  handleCommentUnreplying,
  handleLikingReply,
  handleUnlikingReply,
  handleCommentReplying,
  handleCommenting,
  handleDeletingComment,
  handleLikingComment,
  handleUnlikingComment,
  getPostComments,
  getCommentLikes,
  getCommentReplies,
} = require("../controllers/commentsController");
const { checkLogin } = require("../controllers/authController");

const commentRouter = Router({ mergeParams: true });

commentRouter.use(checkLogin);

commentRouter.route("/").post(handleCommenting).get(getPostComments);
commentRouter.route("/:commentId").delete(handleDeletingComment);
commentRouter
  .route("/:commentId/likes")
  .post(handleLikingComment)
  .delete(handleUnlikingComment)
  .get(getCommentLikes);
commentRouter
  .route("/:commentId/replies")
  .post(handleCommentReplying)
  .get(getCommentReplies);
commentRouter
  .route("/:commentId/replies/:replyId")
  .delete(handleCommentUnreplying);
commentRouter
  .route("/:commentId/replies/:replyId/like")
  .post(handleLikingReply)
  .delete(handleUnlikingReply);

module.exports = commentRouter;
