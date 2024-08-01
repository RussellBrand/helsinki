// console.log("ZZZZZ logger.js loaded");

let SUPPRESS_INFO = false;

const PREFIX = "RLB ";

const suppress_info = () => {
  SUPPRESS_INFO = false;
};
const info = (...params) => {
  if (SUPPRESS_INFO) {
    return;
  }
  console.log(`${PREFIX}INFO:`, ...params);
};

// info("loading utils/logger.js");

const debug = (...params) => {
  console.debug(`${PREFIX}DEBUG:`, ...params);
};

const error = (...params) => {
  console.error(`${PREFIX}ERROR:`, ...params);
};

let SUPPRESS_TEST_LOGGING = true;
const test = (...params) => {
  if (SUPPRESS_TEST_LOGGING) {
    return;
  }
  console.info(`${PREFIX}TEST:`, ...params);
};

const fatal_error = (...params) => {
  console.error(`${PREFIX}FATAL ERROR:`, ...params);
  process.exit(1);
};
module.exports = {
  info,
  error,
  fatal_error,
  suppress_info,
  debug,
  test,
};
