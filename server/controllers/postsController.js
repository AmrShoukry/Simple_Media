const sharp = require("sharp");
const Post = require("../models/Post");
const catchAsync = require("../utils/catchAsync");
const { upload } = require("../utils/uploadImage");

exports.handleCreatingPost = catchAsync( async (req, res, next) => {
    upload.single('image')(req, res, async function(err) {
        try {
            if (err) {
              return next(err);
            }
            const createdAt = Date.now()
            const newPost = await Post.create({
                user: req.user._id,
                content: req.body.content,
                image: `posts-${req.user._id}-${createdAt}.jpeg`,
                createdAt: createdAt
            })

            const user = req.user;

            user.posts.push(newPost._id)

            await user.save()

            if (req.file) {
                await sharp(req.file.buffer)
                  .toFormat("jpeg")
                  .jpeg({ quality: 100 })
                  .toFile(`images/posts-${req.user._id}-${createdAt}.jpeg`);
              }
        
            res.status(201).json({
                status: 'success',
                message: 'created successfully'
            })
        } catch (error) {
            next(error)
        }
    })
});