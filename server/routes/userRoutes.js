const { Router } = require("express");
const {
  handleUpdateUserData,
  handleUpdateUserPassword,
} = require("../controllers/userController");
const { checkLogin, handleLogout } = require("../controllers/authController");

const userRouter = Router();

userRouter.route("/data").patch(checkLogin, handleUpdateUserData);
userRouter
  .route("/password")
  .patch(checkLogin, handleUpdateUserPassword, handleLogout);

module.exports = userRouter;
