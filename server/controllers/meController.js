const catchAsync = require('../utils/catchAsync');
const User = require('../models/User');
const { hash, compare } = require('bcrypt');
const { upload } = require('../utils/uploadImage');
const sharp = require('sharp');
const fs = require('fs');

async function getMy(req, res, action) {
  const data = await User.find({ _id: req.user._id })
    .populate({
      path: action,
      select: 'username',
    })
    .select(action);

  res.status(200).json({
    status: 'success',
    data: data,
  });
}

exports.getMyFollowers = catchAsync(async (req, res, next) => {
  return await getMy(req, res, 'followers');
});

exports.getMyFollowing = catchAsync(async (req, res, next) => {
  return await getMy(req, res, 'following');
});

exports.getMyBlockers = catchAsync(async (req, res, next) => {
  return await getMy(req, res, 'blockers');
});

exports.getMyBlocking = catchAsync(async (req, res, next) => {
  return await getMy(req, res, 'blocking');
});

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
  name2 = null,
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
  upload.single('profilePicture')(req, res, async function (err) {
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

      console.log(newData.firstName);

      if (
        newData.firstName !== user.firstName ||
        newData.lastName !== user.lastName
      ) {
        const nameAvailability = checkNamingAvailability(
          newData,
          user,
          'name',
          'nameLastModifiedAt',
          'firstName',
          'lastName',
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
          'username',
          'usernameLastModifiedAt',
          'username',
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
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`images/profilePicture-${user.username}.jpeg`);
      }

      res.status(200).json({
        status: 'success',
        message: 'Data Updated Successfully',
      });
    } catch (err) {
      console.log(err);
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
    return next('DEFINED=Old-password-incorrect 400');
  }

  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;

  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Password Updated Successfully',
  });
});

exports.handleDeletion = catchAsync(async (req, res, next) => {
  const user = req.user;
  user.active = 'deactivated';

  await user.save();

  res.status(204).json({
    status: 'success',
    message: 'deleted successfully',
  });
});

exports.checkSelf = catchAsync(async (req, res, next) => {
  const id = req.params.userId;

  if (id === req.user._id.toString()) {
    return next("DEFINED=You-can't-do-an-action-to-your-self 400");
  }

  next();
});

exports.checkUser = catchAsync(async (req, res, next) => {
  const id = req.params.userId;

  console.log(req.params);

  console.log(id);

  const userTwo = await User.findOne({ _id: id });

  if (!userTwo) {
    return next("DEFINED=This-user-doesn't-exist 400");
  }

  req.userTwo = userTwo;
  next();
});

function deleteFromList(user, userTwo, action, reverseAction) {
  const index1 = user[action].indexOf(userTwo._id);
  if (index1 !== -1) {
    user[action].splice(index1, 1);
  }

  const index2 = userTwo[reverseAction].indexOf(user._id);
  if (index2 !== -1) {
    userTwo[reverseAction].splice(index2, 1);
  }
}

async function handleActions(
  res,
  req,
  action,
  reverseAction,
  message,
  Inserting,
) {
  const user = req.user;
  const userTwo = req.userTwo;

  if (Inserting) {
    if (!user[action].includes(userTwo._id)) {
      user[action].push(userTwo._id);
    }

    if (!userTwo[reverseAction].includes(user._id)) {
      userTwo[reverseAction].push(user._id);
    }
  } else {
    deleteFromList(user, userTwo, action, reverseAction);
  }

  await user.save();
  await userTwo.save();

  return res.status(200).json({
    status: 'success',
    message: `${user.firstName} ${message} ${userTwo.firstName} successfully`,
  });
}

exports.checkPreBlocking = catchAsync(async (req, res, next) => {
  const user = req.user;
  const userTwo = req.userTwo;

  deleteFromList(user, userTwo, 'following', 'followers');
  deleteFromList(user, userTwo, 'followers', 'following');

  next();
});

exports.checkPreFollowing = catchAsync(async (req, res, next) => {
  const user = req.user;
  const userTwo = req.userTwo;

  const index1 = user.blocking.indexOf(userTwo._id);
  const index2 = user.blockers.indexOf(userTwo._id);
  if (index1 !== -1 || index2 !== -1) {
    return next("DEFINED=You-can't-follow-a-blocked-user 400");
  }
  next();
});

exports.handleFollowingUser = catchAsync(async (req, res, next) => {
  await handleActions(res, req, 'following', 'followers', 'Followed', true);
});

exports.handleUnfollowingUser = catchAsync(async (req, res, next) => {
  await handleActions(res, req, 'following', 'followers', 'Unfollowed', false);
});

exports.handleBlockingUser = catchAsync(async (req, res, next) => {
  await handleActions(res, req, 'blocking', 'blockers', 'Blocked', true);
});

exports.handleUnblockingUser = catchAsync(async (req, res, next) => {
  await handleActions(res, req, 'blocking', 'blockers', 'Unblocked', false);
});

exports.getMyData = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id }).select(
    '-password -passwordConfirm -active',
  );

  res.status(200).json({
    status: 'success',
    data: user,
  });
});
