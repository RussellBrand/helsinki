const logger = require("../utils/logger");
logger.info("loading controllers/blog_controller.js");

const jwt = require("jsonwebtoken");

const blogsRouter = require("express").Router();
const Blog = require("../models/blog_model");
const User = require("../models/user_model");
const { getTokenFrom } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate("user");
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", async (request, response, next) => {
  // logger.debug("POST /api/blogs");

  // return response.status(401).json({ error: "RLB shorat circuit" });

  const body = request.body;
  // logger.debug("body", body);

  let decodedToken = null;
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET);

    // Rest of the code...
  } catch (error) {
    const the_error = error;
    const the_token = request.token;
    //    console.log("the_error", the_error);
    //    console.log("the_token", the_token);
    return response
      .status(401)
      .json({ error: "problem decoding token invalid" });
  }

  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const { title, author, url, likes } = body;

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ? likes : 0,
    user,
  });

  // logger.debug({ blog });

  try {
    const savedBlog = await blog.save();
    // TODO: need to put a populate here
    // TODO: need to add the blog to the user's blog list

    // console.log("controller->savedBlog", savedBlog);

    const user = await User.findById(savedBlog.user);

    //    console.log("controller->user", user);
    if (!user.blogs) {
      user.blogs = [];
    }
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    const re_user = await User.findById(savedBlog.user);

    //    console.log("controller->re_user", re_user);

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  logger.info("DELETE /api/blogs/:id");
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const user_id = decodedToken.id;
  if (!user_id) {
    return response.status(401).json({ error: "token invalid" });
  }

  try {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() !== user_id.toString()) {
      return response.status(401).json({ error: "user not authorized" });
    }

    await Blog.findByIdAndDelete(request.params.id);

    const user = await User.findById(user_id);
    if (!user) {
      return response.status(404).json({ error: "user not found" });
    }
    // Do something with the user record

    await user.updateOne({ $pull: { blogs: blog._id } });

    return response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const { title, author, url, likes } = body;

  deltaBlog = {
    title,
    author,
    url,
    likes: likes ? likes : 0,
  };

  Blog.findByIdAndUpdate(request.params.id, deltaBlog, { new: true })
    .populate("user")
    .then((updatedBlog) => {
      response.json(updatedBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
