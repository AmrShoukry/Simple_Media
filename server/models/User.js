const { Schema, model } = require("mongoose");
const validator = require("validator");
const { hash } = require("bcrypt");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    minLength: [2, "First Name can't be less than 2 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    minLength: [2, "First Name can't be less than 2 characters"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "This username already exists"],
    match: [
      /^[a-z0-9]+$/,
      "Username must contain lowercase characters and numbers only",
    ],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "This email already exists"],
    validate: [validator.isEmail, "This email is invalid"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Password Confirm is required"],
    validate: {
      validator: function (passwordConfirm) {
        return this.password === passwordConfirm;
      },
      message: "Password Confirm doesn't match the entered password",
    },
    select: false,
  },
  profilePicture: {
    type: String,
    default: "default.jpeg",
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  blocked: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  active: {
    type: String,
    enum: ["active", "holding", "deactivated"],
    default: "holding",
  },
  token: {
    type: String,
  },
  craetedAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  passwordLastModifiedAt: {
    type: Date,
    default: null,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await hash(this.password, 10);
  this.passwordConfirm = this.password;

  next();
});

const User = model("User", userSchema);

module.exports = User;
