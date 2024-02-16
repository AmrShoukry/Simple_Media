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
  },
  profilePicture: {
    type: String,
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
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await hash(this.password, 10);
  this.passwordConfirm = this.password;

  next();
});

const User = model("User", userSchema);

model.exports = User;
