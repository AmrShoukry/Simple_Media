const { Router } = require('express');
const {
  handleLogin,
  handleSignup,
  handleAccountVerification,
  handleForgetPassword,
  handleResetPassword,
  handleLogout,
  handleRequestUpdateEmail,
  handleVerifyEmail,
  checkLogin,
} = require('../controllers/authController');

const authRouter = Router();

authRouter.route('/login').post(handleLogin);
authRouter.route('/signup').post(handleSignup);
authRouter.route('/verifyAccount').post(handleAccountVerification);
authRouter.route('/forgetPassword').post(handleForgetPassword);
authRouter.route('/resetPassword').post(handleResetPassword, handleLogout);
authRouter.route('/logout').post(handleLogout);
authRouter
  .route('/requestUpdateEmail')
  .post(checkLogin, handleRequestUpdateEmail);
authRouter.route('/verifyEmail').post(handleVerifyEmail, handleLogout);

module.exports = authRouter;
