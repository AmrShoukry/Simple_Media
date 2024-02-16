const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "This post must have an owner"],
  },
  content: {
    type: String,
    required: [true, "This post must have a content"],
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "This comment must have an owner"],
      },
      content: {
        type: String,
        required: [true, "This comment must have a content"],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      likes: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      replies: [this],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = model("Post", postSchema);

module.exports = Post;
