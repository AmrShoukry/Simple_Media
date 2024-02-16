const express = require("express");
const { json } = require("body-parser");
const errorsController = require("./controllers/errorsController");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(json());
app.use("/auth", authRouter);

app.use("*", (req, res, next) => {
  res.status(500).json({
    status: "Not Implemented",
  });
});

app.use(errorsController);

module.exports = app;
