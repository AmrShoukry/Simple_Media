const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");
const { hash, compare } = require("bcrypt");
const { upload } = require("../utils/uploadImage");
const sharp = require("sharp");
const fs = require("fs");

function renameImage(oldUserName, newUserName, user) {
  const oldImagePath = `${__dirname}/../images/profilePicture-${oldUserName}.jpeg`;
  const newImagePath = `${__dirname}/../images/profilePicture-${newUserName}.jpeg`;

  if (fs.existsSync(oldImagePath)) {
    fs.renameSync(oldImagePath, newImagePath);
    user.profilePicture = `profilePicture-${newUserName}.jpeg`;
  }
}

function checkNamingAvailability(
  newData,
  user,
  field,
  time,
  name1,
  name2 = null
) {
  const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;
  const lastModifiedTimestamp =
    user[time] instanceof Date
      ? user[time].getTime()
      : user[time] === null
      ? 0
      : Date.parse(user[time]);
  const days = lastModifiedTimestamp + thirtyDaysInMilliseconds - Date.now();
  if (user[time] === null || days < 0) {
    user[time] = Date.now();
    user[name1] = newData[name1];
    if (name2 !== null) user[name2] = newData[name2];
  } else {
    const daysRemaining = Math.ceil(days / (1000 * 60 * 60 * 24));

    console.log(lastModifiedTimestamp + thirtyDaysInMilliseconds - Date.now());

    return `DEFINED=You-can't-update-your-${field}-again-for-${daysRemaining}-Days 400`;
  }

  return true;
}

exports.handleUpdateUserData = catchAsync(async (req, res, next) => {
  upload.single("profilePicture")(req, res, async function (err) {
    try {
      if (err) {
        return next(err);
      }

      const user = req.user;

      const newData = {
        firstName: req.body.firstName || user.firstName,
        lastName: req.body.lastName || user.lastName,
        username: req.body.username || user.username,
      };

      if (
        newData.firstName !== user.firstName ||
        newData.lastName !== user.lastName
      ) {
        const nameAvailability = checkNamingAvailability(
          newData,
          user,
          "name",
          "nameLastModifiedAt",
          "firstName",
          "lastName"
        );
        if (nameAvailability !== true) {
          return next(nameAvailability);
        }
      }

      if (newData.username !== user.username) {
        const oldUserName = user.username;
        const usernameAvailability = checkNamingAvailability(
          newData,
          user,
          "username",
          "usernameLastModifiedAt",
          "username"
        );
        if (usernameAvailability !== true) {
          return next(usernameAvailability);
        }

        renameImage(oldUserName, user.username, user);
      }

      await user.save();

      if (req.file) {
        await sharp(req.file.buffer)
          .resize(200, 200)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`images/profilePicture-${user.username}.jpeg`);
      }

      res.status(200).json({
        status: "success",
        message: "Data Updated Successfully",
      });
    } catch (err) {
      console.log(error);
      return next(err);
    }
  });
});

exports.handleUpdateUserPassword = catchAsync(async (req, res, next) => {
  const user = req.user;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.password;
  const newPasswordConfirm = req.body.passwordConfirm;

  console.log(oldPassword);
  console.log(user.password);

  if (!(await compare(oldPassword, user.password))) {
    return next("DEFINED=Old-password-incorrect 400");
  }

  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;

  await user.save();

  res.status(200).json({
    status: "success",
    message: "Password Updated Successfully",
  });
});
