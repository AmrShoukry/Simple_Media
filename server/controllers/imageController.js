const { upload } = require("../utils/uploadImage");

exports.uploadImage = (field) => (req, res, next) => {
  upload.single(field)(req, res, async function (err) {
    if (err) {
      return next(err);
    }
  });
  next();
};
