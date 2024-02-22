const {Router} = require('express')
const { handleCommentUnreplying, handleLikingReply, handleUnlikingReply, handleCommentReplying, handleCommenting, handleDeletingComment, handleLikingComment, handleUnlikingComment } = require("../controllers/commentsController");
const { checkLogin } = require("../controllers/authController");

const commentRouter = Router({mergeParams: true})

commentRouter.use(checkLogin)

commentRouter.route('/').post(handleCommenting)
commentRouter.route('/:commentId').delete(handleDeletingComment)
commentRouter.route('/:commentId/like').get(handleLikingComment)
commentRouter.route('/:commentId/like').delete(handleUnlikingComment)
commentRouter.route('/:commentId/replies').post(handleCommentReplying)
commentRouter.route('/:commentId/replies/:replyId').delete(handleCommentUnreplying)
commentRouter.route('/:commentId/replies/:replyId/like').get(handleLikingReply)
commentRouter.route('/:commentId/replies/:replyId/like').delete(handleUnlikingReply)


module.exports = commentRouter