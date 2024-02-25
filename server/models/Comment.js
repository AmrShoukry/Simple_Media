const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "This post must have an owner"],
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "This comment must be on a post"],
  },
  content: {
    type: String,
    required: [true, "This post must have a content"],
  },
  image: {
    type: String,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  parentComment: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

commentSchema.index({ _id: 1, parentComment: 1 });
commentSchema.index({ post: 1, parentComment: 1 });

const Comment = model("Comment", commentSchema);

module.exports = Comment;
