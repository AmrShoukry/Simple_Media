const { Router } = require('express');
const {
  getUserFollowers,
  getUserFollowing,
  getUserBlockers,
  getUserBlocking,
} = require('../controllers/userController');
const { checkLogin, handleLogout } = require('../controllers/authController');
const { checkUser } = require('../controllers/meController');
const { getUserPosts } = require('../controllers/postsController');

const userRouter = Router({ mergeParams: true });

userRouter.use(checkLogin);
userRouter.use(checkUser);

userRouter.route('/followers').get(getUserFollowers);
userRouter.route('/following').get(getUserFollowing);
userRouter.route('/blockers').get(getUserBlockers);
userRouter.route('/blocking').get(getUserBlocking);
userRouter.route('/posts').get(getUserPosts);

module.exports = userRouter;
