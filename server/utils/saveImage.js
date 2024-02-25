const sharp = require("sharp");

async function saveImage(req, width, height, quality, src) {
  if (width !== null && height !== null) {
    await sharp(req.file.buffer)
      .resize(width, height)
      .toFormat("jpeg")
      .jpeg({ quality: quality })
      .toFile(src);
  } else {
    await sharp(req.file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: quality })
      .toFile(src);
  }
}

module.exports = saveImage;
