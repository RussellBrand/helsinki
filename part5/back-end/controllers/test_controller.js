//const bcrypt = require("bcrypt");
const router = require("express").Router();
const Blog = require("../models/blog_model");
const User = require("../models/user_model");

router.post("/reset", async (_request, response) => {
  console.log("POST.../api/test/reset");
  await Blog.deleteMany({});
  await User.deleteMany({});

  return response.status(204).end();
});

router.get("/reset", async (_request, response) => {
  console.log("GET.../api/test/reset");
  await Blog.deleteMany({});
  await User.deleteMany({});

  return response.status(204).end();
});

module.exports = router;
