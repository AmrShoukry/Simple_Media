const { Router } = require("express");
const { checkLogin } = require("../controllers/authController");
const {
  getAllPaginatedPosts,
  getUserPaginatedPosts,
  getMyPaginatedPosts,
  getUserPaginatedFollowers,
  getUserPaginatedFollowing,
  getUserPaginatedBlockers,
  getUserPaginatedBlocking,
  getMyPopulatedFollowers,
  getMyPopulatedFollowing,
  getMyPopulatedBlockers,
  getMyPopulatedBlocking,
  getPostPopulatedComments,
  getCommentPopulatedLikes,
  getCommentPopulatedReplies,
} = require("../controllers/paginationController");

const paginationRouter = Router();
paginationRouter.use(checkLogin);

paginationRouter.get("/posts", getAllPaginatedPosts);
paginationRouter.get("/posts/:postId/comments", getPostPopulatedComments);
paginationRouter.get(
  "/posts/:postId/comments/:commentId/likes",
  getCommentPopulatedLikes
);
paginationRouter.get(
  "/posts/:postId/comments/:commentId/replies",
  getCommentPopulatedReplies
);

paginationRouter.get("/me/posts", getMyPaginatedPosts);
paginationRouter.get("/me/followers", getMyPopulatedFollowers);
paginationRouter.get("/me/following", getMyPopulatedFollowing);
paginationRouter.get("/me/blockers", getMyPopulatedBlockers);
paginationRouter.get("/me/blocking", getMyPopulatedBlocking);

paginationRouter.get("/user/:userId/posts", getUserPaginatedPosts);
paginationRouter.get("/user/:userId/followers", getUserPaginatedFollowers);
paginationRouter.get("/user/:userId/following", getUserPaginatedFollowing);
paginationRouter.get("/user/:userId/blockers", getUserPaginatedBlockers);
paginationRouter.get("/user/:userId/blocking", getUserPaginatedBlocking);

module.exports = paginationRouter;
