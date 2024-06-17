// really would be better to raise error if no blogs

const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const answer = blogs.reduce((max, blog) =>
    max.likes > blog.likes ? max : blog
  );

  const { title, author, likes } = answer;

  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const authorCounts = _.countBy(blogs, "author");

  const authorWithMostBlogs = _.maxBy(
    Object.entries(authorCounts),
    (author) => author[1]
  );

  return { author: authorWithMostBlogs[0], blogs: authorWithMostBlogs[1] };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const likesByAuthor = _.groupBy(blogs, "author");
  // const authorLikes = Object.entries(likesByAuthor).map(([author, blogs]) => {
  //   const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  //   return { author, likes: totalLikes };
  // });

  const running_totals = {};

  blogs.forEach((blog) => {
    const tmp = running_totals[blog["author"]] || 0;
    running_totals[blog["author"]] = tmp + blog.likes;
  });

  const authorWithMostLikes = _.maxBy(
    Object.entries(running_totals),
    ([author, likes]) => likes
  );

  return {
    author: authorWithMostLikes[0],
    likes: authorWithMostLikes[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
