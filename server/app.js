const express = require("express");
const { json, urlencoded } = require("body-parser");
const errorsController = require("./controllers/errorsController");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use("*", (req, res, next) => {
  res.status(500).json({
    status: "Not Implemented",
  });
});

app.use(errorsController);

module.exports = app;
