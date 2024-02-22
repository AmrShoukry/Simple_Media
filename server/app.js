const express = require("express");
const { json, urlencoded } = require("body-parser");
const cors = require('cors');

const errorsController = require("./controllers/errorsController");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const postsRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoutes");

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

app.use(cors())
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/posts", postsRouter);
app.use('/posts/:postId/comments', commentRouter)


app.use("*", (req, res, next) => {
  res.status(500).json({
    status: "Not Implemented",
  });
});

app.use(errorsController);

module.exports = app;
