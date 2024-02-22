const {Router} = require('express')
const { handleCommentUnreplying, handleLikingReply, handleUnlikingReply, handleCommentReplying, handleCommenting, handleDeletingComment, handleLikingComment, handleUnlikingComment } = require("../controllers/commentsController");
const { checkLogin } = require("../controllers/authController");

const commentRouter = Router({mergeParams: true})

commentRouter.use(checkLogin)

postsRouter.route('/').post(handleCommenting)
postsRouter.route('/:commentId').delete(handleDeletingComment)
postsRouter.route('/:commentId/like').get(handleLikingComment)
postsRouter.route('/:commentId/like').delete(handleUnlikingComment)
postsRouter.route('/:commentId/replies').post(handleCommentReplying)
postsRouter.route('/:commentId/replies/:replyId').delete(handleCommentUnreplying)
postsRouter.route('/:commentId/replies/:replyId/like').get(handleLikingReply)
postsRouter.route('/:commentId/replies/:replyId/like').delete(handleUnlikingReply)


module.exports = commentRouter