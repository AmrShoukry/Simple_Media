const { Router } = require("express");
const { handleLogin, handleSignup } = require("../controllers/authController");

const authRouter = Router();

authRouter.route("/login").post(handleLogin);
authRouter.route("/signup").post(handleSignup);

module.exports = authRouter;
