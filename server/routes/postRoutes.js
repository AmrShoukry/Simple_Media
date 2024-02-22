const { Router } = require("express");
const { handleCreatingPost, handleDeletingPost, handleLikingPost, handleUnlikingPost } = require("../controllers/postsController");
const { checkLogin } = require("../controllers/authController");

const postsRouter = Router();

postsRouter.use(checkLogin)

postsRouter.route('/').post(handleCreatingPost)
postsRouter.route('/:postId').delete(handleDeletingPost)
postsRouter.route('/:postId/like').get(handleLikingPost)
postsRouter.route('/:postId/like').delete(handleUnlikingPost)


module.exports = postsRouter;