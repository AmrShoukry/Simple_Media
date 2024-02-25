const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");
const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const Email = require("../utils/email");
const crypto = require("crypto");
const validator = require("validator");
const { promisify } = require("util");
const saveImage = require("../utils/saveImage");

function generateVerificationToken() {
  return crypto.randomBytes(20).toString("hex");
}

function signToken(userId) {
  const payload = { userId };
  const secretKey = process.env.SECRET_KEY;
  const options = {
    expiresIn: "30d",
  };
  return jwt.sign(payload, secretKey, options);
}

function signCookie(req, res, token, expirationDuration) {
  res.cookie("jwt", token, {
    expires: new Date(expirationDuration),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
}

function checkTokenValidity(req, verificationToken) {
  if (!verificationToken) {
    return "DEFINED=Invalid-Token 400";
  }

  const creationTime = req.body.creationTime;
  const currentTime = Date.now();
  const expirationDuration = 10 * 60 * 1000;
  const timeDifference = currentTime - creationTime;

  if (timeDifference > expirationDuration) {
    return "DEFINED=Token-Expired 400";
  }

  return true;
}

exports.handleLogin = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next("DEFINED=Incorrect-credentials 400");
  }

  const user = await User.findOne({
    $or: [{ active: "active" }, { active: "deactivated" }],
    email: req.body.email,
  }).select("+password");

  if (!user) {
    return next("DEFINED=User-Not-Found 400");
  }

  if (user.active === "deactivated") {
    user.active = "active";
    await user.save();
  }

  if (user && (await compare(req.body.password, user.password))) {
    const token = signToken(user._id);
    signCookie(req, res, token, Date.now() + 30 * 24 * 60 * 60 * 1000);

    return res.status(200).json({
      status: "success",
      token: token,
    });
  }

  return next("DEFINED=User-Not-Found 400");
});

exports.handleSignup = catchAsync(async (req, res, next) => {
  let holdingUser = await User.findOne({
    email: req.body.email,
    active: "holding",
  });

  let verificationToken = holdingUser?.token || undefined;

  if (!holdingUser) {
    verificationToken = generateVerificationToken();
    holdingUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      profilePicture: req.file
        ? `profilePicture-${req.body.username}.jpeg`
        : "default.jpeg",
      active: "holding",
      token: verificationToken,
    });
  }

  const email = new Email(
    holdingUser,
    `http://localhost:8000/auth/verifyAccount`,
    verificationToken
  );

  email.send("verify", "Email verification");

  if (req.file) {
    // prettier-ignore
    await saveImage(req, 200, 200, 90, `images/profilePicture-${holdingUser.username}.jpeg`);
  }

  res.status(201).json({
    status: "Email Sent successfully",
  });
});

exports.handleAccountVerification = catchAsync(async (req, res, next) => {
  const verificationToken = req.body.token;
  const tokenValidity = checkTokenValidity(req, verificationToken);
  if (tokenValidity !== true) {
    return next(tokenValidity);
  }

  const user = await User.findOne({
    token: verificationToken,
  });

  if (user) {
    user.active = "active";
    user.token = null;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Please Login using your newly verified email",
    });
  }

  return next("DEFINED=Invalid-Token 400");
});

exports.handleForgetPassword = catchAsync(async (req, res, next) => {
  const useremail = req.body.email;
  const user = await User.findOne({ active: "active", email: useremail });

  if (!user) {
    return next("DEFINED=This-email-doesn't-exist 401");
  }

  const verificationToken = generateVerificationToken();

  user.token = verificationToken;

  await user.save();

  const email = new Email(
    user,
    `http://localhost:8000/auth/resetPassword}`,
    verificationToken
  );

  email.send("change", "Change Password");

  res.status(200).json({
    status: "successfull",
    message: "email sent successfully to change password",
  });
});

exports.handleResetPassword = catchAsync(async (req, res, next) => {
  const verificationToken = req.body.token;
  const tokenValidity = checkTokenValidity(req, verificationToken);
  if (tokenValidity !== true) {
    return next(tokenValidity);
  }

  const user = await User.findOne({
    active: "active",
    token: verificationToken,
  });

  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.token = null;

  await user.save();

  return res.status(200).json({
    status: "success",
    message: "password changed succsessfully",
  });
});

exports.handleLogout = catchAsync(async (req, res, next) => {
  signCookie(req, res, "", Date.now() + 1 * 1000);

  return res.status(200).json({
    status: "success",
    message: "logged out successfully",
  });
});

exports.handleRequestUpdateEmail = catchAsync(async (req, res, next) => {
  const emailuser = req.user.email;
  const newEmail = req.body.newEmail;

  if (!validator.isEmail(newEmail)) {
    return next("DEFINED=Invalid-Email-Address 400");
  }

  const existingUser = await User.findOne({ email: newEmail });
  if (existingUser) {
    return next(
      "DEFINED=This-New-Email-Already-Exists-In-Our-Database-Please-Use-Another-One 400"
    );
  }

  const user = await User.findOne({ active: "active", email: emailuser });
  const verificationToken = generateVerificationToken();

  user.token = verificationToken;

  user.save();

  const email = new Email(
    user,
    `http://localhost:8000/auth/verifyEmail`,
    verificationToken,
    newEmail
  );

  email.send("email", "Change Email");

  res.status(200).json({
    status: "success",
    message: `Email sent successfully to ${newEmail} to verify it`,
  });
});

exports.handleVerifyEmail = catchAsync(async (req, res, next) => {
  const verificationToken = req.body.token;
  const tokenValidity = checkTokenValidity(req, verificationToken);
  if (tokenValidity !== true) {
    return next(tokenValidity);
  }

  const email = req.body.email;
  const newEmail = req.body.newEmail;

  const user = await User.findOne({ email: email, token: verificationToken });

  user.email = newEmail;
  user.token = null;

  await user.save();

  res.status(200).json({
    status: "success",
    message: `Email updated successfully from ${email} to ${newEmail}`,
  });
});

exports.checkLogin = catchAsync(async (req, res, next) => {
  let token;

  if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next("DEFINED=You-have-to-login-first 401");
  }

  const userDecoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_KEY
  );

  const user = await User.findById(userDecoded.userId);

  if (!user) {
    return next("DEFINED=Invalid-token-please-login-again 401");
  }

  req.user = user;

  next();
});
