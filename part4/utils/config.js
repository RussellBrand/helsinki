const logger = require("../utils/logger");
// console.info("loading utils/config.js");

require("dotenv").config();

if (process.env.SECRET === undefined) {
  logger.fatal_error("SECRET is undefined");
}

const PERMITED_ENVS = ["development", "test", "production"];

// RLB: should use a constant
let NODE_ENV = process.env.NODE_ENV;

// console.log("process.env", process.env)

if (!NODE_ENV) {
  // logger.fatal_error("NODE_ENV is undefined");
  NODE_ENV = "test";
  logger.info("NODE_ENV is undefined, defaulting to test");
}

if (!PERMITED_ENVS.includes(NODE_ENV)) {
  logger.fatal_error("NODE_ENV is invalid");
}

if (NODE_ENV === "test") {
  logger.suppress_info();
}

let MONGODB_URI =
  NODE_ENV === "test" ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;

if (!MONGODB_URI) {

    logger.fatal_error("MONGODB_URI is undefined");
}

let PORT = process.env.PORT;

if (!PORT) {
  if (NODE_ENV !== "test") {
    logger.fatal_error("PORT is undefined");
  }
  logger.info("PORT was undefined using 3003");
  PORT = "3003";
}

module.exports = {
  MONGODB_URI,
  PORT,
  NODE_ENV,
};
