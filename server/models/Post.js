const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "This post must have an owner"],
    index: true,
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
  comments: [
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

const Post = model("Post", postSchema);

module.exports = Post;
