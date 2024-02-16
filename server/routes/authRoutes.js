const { Router } = require("express");
const { handleLogin } = require("../controllers/authController");

const authRouter = Router();

authRouter.route("/login").post(handleLogin);

module.exports = authRouter;
