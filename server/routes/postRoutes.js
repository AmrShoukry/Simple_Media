const { Router } = require("express");
const {
  handleCreatingPost,
  handleDeletingPost,
  handleLikingPost,
  handleUnlikingPost,
  getAllPosts,
  getUserPosts,
  getMyPosts,
  getPost,
  getPostLikes,
} = require("../controllers/postsController");
const { checkLogin } = require("../controllers/authController");
const { uploadImage } = require("../controllers/imageController");

const postsRouter = Router();

postsRouter.use(checkLogin);

postsRouter
  .route("/")
  .post(uploadImage("image"), handleCreatingPost)
  .get(getAllPosts);
postsRouter.route("/:postId").delete(handleDeletingPost).get(getPost);
postsRouter
  .route("/:postId/likes")
  .post(handleLikingPost)
  .delete(handleUnlikingPost)
  .get(getPostLikes);
postsRouter.route("/user/:userId").get(getUserPosts);
postsRouter.route("/me").get(getMyPosts);

module.exports = postsRouter;
