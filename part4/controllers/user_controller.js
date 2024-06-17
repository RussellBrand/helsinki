const logger = require("../utils/logger");
logger.info("loading controller/user_controller.js");

const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user_model");
const { log } = require("console");

usersRouter.get("/", async (request, response) => {
  // logger.debug("GET /api/users");
  const users = await User.find({}).populate("blogs");
  // logger.debug("Users found:", users);
  response.json(users.map((user) => user.toJSON()));
});
usersRouter.post("/", async (request, response) => {
  // logger.debug("POST /api/users");
  const { username, name, password } = request.body;
  // logger.debug("username:", username);
  // logger.debug("name:", name);
  // logger.debug("password:", password);

  if (!password) {
    // logger.debug("Password is required");
    return response.status(400).json({ error: "Password is required" });
  }

  if (password.length < 3) {
    // logger.debug("Password must be at least 3 characters long");
    return response
      .status(400)
      .json({ error: "Password must be at least 3 characters long" });
  }
  // logger.debug("Password length:", password.length);

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username: username,
    name: name,
    passwordHash: passwordHash,
  });

  try {
    const savedUser = await user.save();
    // logger.debug("User saved:", savedUser);
    // logger.debug("User saved as JSON:", savedUser.toJSON());
    return response.status(201).json(savedUser);
  } catch (error) {
    // logger.debug("Error saving user:", error.message);
    return response.status(400).json({ error: error.message });
  }
});

module.exports = usersRouter;
