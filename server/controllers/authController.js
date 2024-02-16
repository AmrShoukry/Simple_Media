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
      const verificationToken = generateVerificationToken();

      const newUser = await User.create({
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

      const email = new Email(
        newUser,
        `http://localhost:8000/auth/verify?token=${verificationToken}`,
        verificationToken
      );

      email.send("verify", "Email verification");

      if (req.file) {
        await sharp(req.file.buffer)
          .resize(200, 200)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`images/profilePicture-${newUser.username}.jpeg`);
      }

      res.status(201).json({
        status: "created successfully",
      });
    } catch (error) {
      next(error);
    }
  });
});

exports.handleVerification = catchAsync(async (req, res, next) => {
  console.log(req.query.token);
  const user = await User.findOne({
    token: req.query.token,
  });

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
