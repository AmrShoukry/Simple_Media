const { Router } = require("express");
const {
  handleUpdateUserData,
  handleUpdateUserPassword,
  handleDeletion,
  getMyFollowers,
  getMyFollowing,
  handleUnfollowingUser,
  checkPreFollowing,
  handleFollowingUser,
  getMyBlockers,
  getMyBlocking,
  handleBlockingUser,
  checkPreBlocking,
  getMyData,
  checkUser,
  handleUnblockingUser,
  checkSelf,
} = require("../controllers/meController");
const { handleLogout, checkLogin } = require("../controllers/authController");
const { getMyPosts, uploadImage } = require("../controllers/postsController");

const meRouter = Router();

meRouter.use(checkLogin);

meRouter
  .route("/data")
  .get(getMyData)
  .patch(uploadImage("profilePicture"), handleUpdateUserData);
meRouter.route("/password").patch(handleUpdateUserPassword, handleLogout);
meRouter.route("/deactivate").delete(handleDeletion, handleLogout);

meRouter.route("/followers").get(getMyFollowers);
meRouter.route("/following").get(getMyFollowing);
meRouter.route("/blockers").get(getMyBlockers);
meRouter.route("/blocking").get(getMyBlocking);

meRouter
  .route("/following/:userId")
  .delete(checkSelf, checkUser, handleUnfollowingUser)
  .post(checkSelf, checkUser, checkPreFollowing, handleFollowingUser);
meRouter
  .route("/blocking/:userId")
  .delete(checkSelf, checkUser, handleUnblockingUser)
  .post(checkSelf, checkUser, checkPreBlocking, handleBlockingUser);

meRouter.get("/posts", getMyPosts);
module.exports = meRouter;
