const logger = require("./utils/logger");
const config = require("./utils/config");
logger.info("loading app.js");

const express = require("express");
const app = express();
const cors = require("cors");

app.get("/quit", (request, response) => {
  logger.debug("Quit request receied");
  process.exit();
  return response.json("Should quit");
});

const loginRouter = require("./controllers/login_controller");
const blogsRouter = require("./controllers/blog_controller");
const usersRouter = require("./controllers/user_controller");

const middleware = require("./utils/middleware");

const mongoose = require("mongoose");

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

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
