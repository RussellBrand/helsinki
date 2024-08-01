// console.log("first line of index.js");
const logger = require("./utils/logger");
logger.info("loading index.js");
const app = require("./app"); // the actual Express application
const config = require("./utils/config");

app.listen(config.PORT, () => {
  logger.info("process.env.NODE_ENV:", process.env.NODE_ENV);
  const currentTime = new Date().toLocaleTimeString();
  logger.info(`Server running on port ${config.PORT} at ${currentTime}`);
});
