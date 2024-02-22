const sharp = require("sharp");
const Post = require("../models/Post");
const catchAsync = require("../utils/catchAsync");
const { upload } = require("../utils/uploadImage");
const fs = require('fs');


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

exports.handleDeletingPost = catchAsync( async (req, res, next) => {
    const postId = req.params.postId;
    const post = await Post.findOne({'_id': postId});
    const postCreationDate = post.createdAt.getTime();
    const user = req.user;

    if (user._id.toString() !== post.user.toString() ) {
        return next("DEFINED=You-can't-delete-other-users-posts 403")
    }

    await post.deleteOne();
    
    const index = user.posts.indexOf(postId);
    if (index !== -1) {
        user.posts.splice(index, 1);
    }
  
    await user.save()

    const filePath = `${__dirname}/../images/posts-${user._id}-${postCreationDate}.jpeg`
    fs.unlink(filePath, (err) => {})

    return res.status(204).json({
        status: 'success',
        message: 'Deleted Successfully'
    })
})

exports.handleLikingPost = catchAsync( async (req, res, next) => {
    const postId = req.params.postId;
    const post = await Post.findOne({'_id': postId});
    const user = req.user

    if (!post.likes.includes(user._id)) {
        post.likes.push(user._id);
    }

    await post.save()

    return res.status(200).json({
        status: 'success',
        message: 'Liked Successfully'
    })
  
})

exports.handleUnlikingPost = catchAsync( async (req, res, next) => {
    const postId = req.params.postId;
    const post = await Post.findOne({'_id': postId});
    const user = req.user

    const index = post.likes.indexOf(user._id);
    if (index !== -1) {
        post.likes.splice(index, 1);
    }

    await post.save()

    return res.status(200).json({
        status: 'success',
        message: 'Unliked Successfully'
    })
  
})
