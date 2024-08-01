const logger = require("../utils/logger");

logger.info("loading utils/middleware.js");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
//   logger.debug(error.name, error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  }

  logger.error("unexpected error type", error.message);

  return response
    .status(400)
    .json({
      error: `unexpected error type:${error.type} message:${error.message}`,
    });

  next(error);
};

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

const tokenExtractor = (request, response, next) => {
  request.token = getTokenFrom(request);
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getTokenFrom,
  tokenExtractor,
};
