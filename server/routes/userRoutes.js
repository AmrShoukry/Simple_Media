const { Router } = require("express");
const {
  getUserFollowers,
  getUserFollowing,
  getUserBlockers,
  getUserBlocking,
  getUserData,
} = require("../controllers/userController");
const { checkLogin } = require("../controllers/authController");
const { checkUser } = require("../controllers/meController");
const { getUserPosts } = require("../controllers/postsController");

const userRouter = Router({ mergeParams: true });

userRouter.use(checkLogin);
userRouter.use(checkUser);

userRouter.route("/followers").get(getUserFollowers);
userRouter.route("/following").get(getUserFollowing);
userRouter.route("/blockers").get(getUserBlockers);
userRouter.route("/blocking").get(getUserBlocking);
userRouter.route("/posts").get(getUserPosts);
userRouter.route("/data").get(getUserData);

module.exports = userRouter;
