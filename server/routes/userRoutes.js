const { Router } = require("express");
const {
  handleUpdateUserData,
  handleUpdateUserPassword,
  handleDeletion,
  handleFollowingUser,
  handleUnfollowingUser,
  checkUser,
  handleBlockingUser,
  handleUnblockingUser,
  checkPreBlocking,
  checkPreFollowing,
} = require("../controllers/userController");
const { checkLogin, handleLogout } = require("../controllers/authController");

const userRouter = Router();

userRouter.route("/data").patch(checkLogin, handleUpdateUserData);
userRouter
  .route("/password")
  .patch(checkLogin, handleUpdateUserPassword, handleLogout);
userRouter
  .route("/deactivate")
  .delete(checkLogin, handleDeletion, handleLogout);

userRouter
  .route("/follow")
  .post(checkLogin, checkUser, checkPreFollowing, handleFollowingUser);
userRouter
  .route("/unfollow")
  .post(checkLogin, checkUser, handleUnfollowingUser);

userRouter
  .route("/block")
  .post(checkLogin, checkUser, checkPreBlocking, handleBlockingUser);
userRouter.route("/unblock").post(checkLogin, checkUser, handleUnblockingUser);

module.exports = userRouter;
