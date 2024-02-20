const { Router } = require("express");
const { handleCreatingPost } = require("../controllers/postsController");
const { checkLogin } = require("../controllers/authController");

const postsRouter = Router();

postsRouter.use(checkLogin)

postsRouter.route('/').post(handleCreatingPost)


module.exports = postsRouter;