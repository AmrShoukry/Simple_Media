const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");
const { compare } = require("bcrypt");
const { upload } = require("../utils/uploadImage");
const sharp = require("sharp");
const jwt = require("jsonwebtoken");
const Email = require("../utils/email");
const crypto = require("crypto");

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

exports.handleLogin = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next("Incorrect credentials");
  }

  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  if (user && (await compare(req.body.password, user.password))) {
    const token = signToken(user._id);
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });

    return res.status(200).json({
      status: "success",
      token: token,
    });
  }

  return next("Incorrect credentials");
});

exports.handleSignup = catchAsync(async (req, res, next) => {
  upload.single("profilePicture")(req, res, async function (err) {
    if (err) {
      return next(err);
    }
    try {
      let holdingUser = await User.findOne({
        email: req.body.email,
        active: "holding",
      });

      let verificationToken = holdingUser?.token || undefined;
      console.log(`Cerification Token is ${verificationToken}`);

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
        `http://localhost:8000/auth/verify?token=${verificationToken}&creationTime=${Date.now()}`,
        verificationToken
      );

      email.send("verify", "Email verification");

      if (req.file) {
        await sharp(req.file.buffer)
          .resize(200, 200)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`images/profilePicture-${holdingUser.username}.jpeg`);
      }

      res.status(201).json({
        status: "Email Sent successfully",
      });
    } catch (error) {
      next(error);
    }
  });
});

exports.handleVerification = catchAsync(async (req, res, next) => {
  const verificationToken = req.query.token;

  if (!verificationToken) {
    return res.status(400).json({
      status: "error",
      message: "Invalid token",
    });
  }

  const creationTime = req.query.creationTime;
  const currentTime = Date.now();
  const expirationDuration = 10 * 60 * 1000;
  const timeDifference = currentTime - creationTime;

  if (timeDifference > expirationDuration) {
    return res.status(400).send("Token expired");
  }

  const user = await User.findOne({
    token: verificationToken,
  });

  console.log(user);

  if (user) {
    user.active = "active";
    user.token = null;
    await user.save();

    // const token = signToken(user._id);
    // res.cookie("jwt", token, {
    //   expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    //   httpOnly: true,
    //   secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    // });

    return res.status(200).json({
      status: "success",
      message: "Please Login using your newly verified email",
    });
  }

  return res.status(400).json({
    status: "error",
    message: "Invalid token",
  });
});

exports.handleForgetPassword = catchAsync(async (req, res, next) => {
  const useremail = req.body.email;
  const user = await User.findOne({ active: "active", email: useremail });

  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "This email doesn't exist",
    });
  }

  const verificationToken = generateVerificationToken();

  user.token = verificationToken;

  await user.save();

  const email = new Email(
    user,
    `http://localhost:8000/auth/reset?token=${verificationToken}&creationTime=${Date.now()}`,
    verificationToken
  );

  email.send("change", "Change Password");

  res.status(200).json({
    status: "successfull",
    message: "email sent successfully to change password",
  });
});

exports.handleResetPassword = catchAsync(async (req, res, next) => {
  const verificationToken = req.query.token;
  const creationTime = req.query.creationTime;
  const currentTime = Date.now();

  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;

  console.log(passwordConfirm);
  console.log(password);
  console.log("4");

  const expirationDuration = 10 * 60 * 1000;

  const timeDifference = currentTime - creationTime;

  if (timeDifference > expirationDuration) {
    return res.status(400).send("Token expired");
  }

  const user = await User.findOne({
    active: "active",
    token: verificationToken,
  });

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.token = null;

  console.log(user);

  await user.save();
});

exports.handleLogout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  return res.status(200).json({
    status: "success",
    message: "logged out successfully",
  });
});
