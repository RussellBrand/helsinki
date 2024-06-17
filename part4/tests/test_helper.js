// console.log("ZZZZZ test_helper.js loaded");

const logger = require("../utils/logger");
const Blog = require("../models/blog_model");
const User = require("../models/user_model");

const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { api } = require("./blog-api.test");

// let root_token = null;

const initialBlogs = [
  {
    title: "HTML is easy",
    author: "first author",
    url: "http://localhost/first_url.html",
    likes: 1,
  },
  {
    title: "second title",
    author: "second author",
    url: "http://localhost/second_url.html",
    likes: 2,
  },
];

//  TODO: should abstract out the creation of users

const root_password = "Sekret";
const root_username = "root";

beforeEach(async () => {
  logger.test("before each");

  await User.deleteMany({});

  const passwordHash = await bcrypt.hash(root_password, 10);

  const root_user = new User({
    name: "Mr.Admin",
    username: root_username,
    passwordHash,
  });

  const saved_user = await root_user.save();

  const userForToken = {
    username: saved_user.username,
    id: saved_user._id,
  };

  // console.dir(process.env);
  // console.log("secret", process.env.SECRET);
  // root_token = jwt.sign(userForToken, process.env.SECRET);
  // console.log("root_token", root_token);

  await Blog.deleteMany({});

  // TODO: should abstract out the creation of blogs with user linkage setup properly
  const blogObjects = initialBlogs.map(
    (blog) => new Blog({ ...blog, user: saved_user._id })
  );
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);

  const my_blogs = await Blog.find({});
  const my_blogs_ids = my_blogs.map((b) => b._id);
  saved_user.blogs = my_blogs_ids;
  await saved_user.save();
});

afterAll(async () => {
  logger.test("after ALL");
  await mongoose.connection.close();
  logger.test("final after awaiting mongoose close");
});

afterEach(async () => {
  logger.test("afterEach");
});

beforeAll(async () => {
  logger.test("before ALLe");
});

const allUsers = async () => {
  return await User.find({});
};

const allUsersJSON = async () => {
  const users = await allUser();
  return users.map((u) => u.toJSON());
};

// logger.test("test_helper.js loaded");

const create_login_token = async () => {
  const loginResponse = await api.post("/api/login").send({
    username: root_username,
    password: root_password,
  });
  const login_token = loginResponse.body.token;
  return login_token;
};

const helpers = {
  initialBlogs,
  allUsers,
  allUsersJSON,
  root_username,
  root_password,
  create_login_token,
  //  root_token, // root_token ends up being nulll, I don't know why
};

module.exports = helpers;
