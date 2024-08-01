const logger = require("../utils/logger");
logger.info("loading models/user_model.js");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, "Username must be at least 3 characters long"],
  },
  name: {
    type: String,
    required: true,
    minlength: [3, "Name must be at least 3 characters long"],
  },
  passwordHash: { type: String, required: true },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

/**
 * Retrieves all users from the database.
 * @returns {Array<Object>} An array of user objects in JSON format.
 */

module.exports = User;
