const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");
const { compare } = require("bcrypt");
const { upload } = require("../utils/uploadImage");
const sharp = require("sharp");

exports.handleLogin = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next("Incorrect credentials");
  }

  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  if (user && (await compare(req.body.password, user.password))) {
    return res.status(200).json({
      status: "success",
    });
  }

  return next("Incorrect credentials");
});

exports.handleSignup = catchAsync(async (req, res, next) => {
  upload.single("profilePicture")(req, res, async function (err) {
    if (err) {
      return next(err); // Pass any multer errors to the error handling middleware
    }
    try {
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
        active: true,
      });

      // Resize and save the profile picture
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
