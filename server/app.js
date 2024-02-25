const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const mongoSantize = require("express-mongo-sanitize");
const hpp = require("hpp");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");

const errorsController = require("./controllers/errorsController");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const postsRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoutes");
const meRouter = require("./routes/meRoutes");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
});

const app = express();

app.enable("trust proxy"); // Enable trust proxy to trust the headers set by the proxy server
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) to allow cross-origin requests
app.use(json()); // Parse incoming JSON requests
app.use(urlencoded({ extended: true })); // Parse incoming URL-encoded requests with extended mode enabled
app.use(cookieParser()); // Parse cookies from incoming requests
app.use(helmet()); // Add security-related HTTP headers using Helmet middleware
app.use(limiter); // Apply rate limiting to prevent DoS attacks using the limiter middleware
app.use(mongoSantize()); // Sanitize incoming request data against NoSQL Injection using express-mongo-sanitize middleware
app.use(xss()); // Sanitize incoming request data against XSS attacks using xss-clean middleware
app.use(hpp()); // Prevent HTTP Parameter Pollution attacks using hpp middleware
app.use(compression()); // Compress HTTP responses using gzip/deflate algorithms using compression middleware

app.use("/auth", authRouter);
app.use("/user/:userId", userRouter);
app.use("/me", meRouter);
app.use("/posts", postsRouter);
app.use("/posts/:postId/comments", commentRouter);

app.use("*", (req, res, next) => {
  res.status(500).json({
    status: "Not Implemented",
  });
});

app.use(errorsController);

module.exports = app;
