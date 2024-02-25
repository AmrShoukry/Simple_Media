const sharp = require("sharp");

async function saveImage(req, width, height, quality, src) {
  await sharp(req.file.buffer)
    .resize(width, height)
    .toFormat("jpeg")
    .jpeg({ quality: quality })
    .toFile(src);
}

module.exports = saveImage;
