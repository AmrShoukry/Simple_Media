const { Router } = require("express");
const {
  handleLogin,
  handleSignup,
  handleVerification,
} = require("../controllers/authController");

const authRouter = Router();

authRouter.route("/login").post(handleLogin);
authRouter.route("/signup").post(handleSignup);
authRouter.route("/verify").get(handleVerification);

module.exports = authRouter;
