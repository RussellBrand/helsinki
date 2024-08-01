const logger = require("./utils/logger");
const config = require("./utils/config");
logger.info("loading app.js");

const express = require("express");
const app = express();
const cors = require("cors");

app.get("/quit", (_request, _response) => {
  logger.debug("Quit request receied");
  process.exit();
});

const loginRouter = require("./controllers/login_controller");
const blogsRouter = require("./controllers/blog_controller");
const usersRouter = require("./controllers/user_controller");
const testRouter = require("./controllers/test_controller");

const middleware = require("./utils/middleware");

const mongoose = require("mongoose");
// const { default: test } = require("node:test");

mongoose.set("strictQuery", false);

// console.log("line 25")
// console.log("connecting to", config.MONGODB_URI);
// console.log("line 27")

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/login", loginRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
// this should only be in the test environment

app.use("/api/test", testRouter);

// function responseLogger(req, res, next) {
//   const originalSend = res.send;
//   res.send = function (body) {
//     console.log("Response:", body); // Log the response body
//     originalSend.call(this, body);
//   };
//   next();
// }

function responseLogger(req, res, next) {
  const originalSend = res.send;
  const originalStatus = res.status;
  let responseStatus = 200; // Default status code is 200

  // Override res.status() to capture the status code
  res.status = function (code) {
    responseStatus = code;
    return originalStatus.call(this, code);
  };

  // Override res.send() to log the response body and status code
  res.send = function (body) {
    console.log("Response Status:", responseStatus, "Response:", body);
    originalSend.call(this, body);
  };

  next();
}

app.use(responseLogger);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
