const { Router } = require("express");
const { handleCreatingPost, handleDeletingPost, handleLikingPost, handleUnlikingPost, handleCommenting, handleDeletingComment, handleLikingComment, handleUnlikingComment } = require("../controllers/postsController");
const { checkLogin } = require("../controllers/authController");

const postsRouter = Router();

postsRouter.use(checkLogin)

postsRouter.route('/').post(handleCreatingPost)
postsRouter.route('/:postId').delete(handleDeletingPost)
postsRouter.route('/:postId/like').get(handleLikingPost)
postsRouter.route('/:postId/like').delete(handleUnlikingPost)
postsRouter.route('/:postId/comments').post(handleCommenting)
postsRouter.route('/:postId/comments/:commentId').delete(handleDeletingComment)
postsRouter.route('/:postId/comments/:commentId/like').get(handleLikingComment)
postsRouter.route('/:postId/comments/:commentId/like').delete(handleUnlikingComment)

module.exports = postsRouter;