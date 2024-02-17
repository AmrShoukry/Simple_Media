const { Router } = require("express");
const {
  handleLogin,
  handleSignup,
  handleVerification,
  handleForgetPassword,
  handleResetPassword,
  handleLogout,
} = require("../controllers/authController");

const authRouter = Router();

authRouter.route("/login").post(handleLogin);
authRouter.route("/signup").post(handleSignup);
authRouter.route("/verify").get(handleVerification);
authRouter.route("/forgetPassword").post(handleForgetPassword);
authRouter.route("/resetPassword").post(handleResetPassword);
authRouter.route("/logout").get(handleLogout);

module.exports = authRouter;
