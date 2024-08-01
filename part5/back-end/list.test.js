// really would be better to raise error if no blogs

const { describe } = require("node:test");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

const SAMPLE_BLOGS = [
  // in asceding order of likes
  {
    title: "blog1",
    author: "author1",
    likes: 1,
  },
  { title: "blog2", author: "most prolific", likes: 2 },
  { title: "blog3", author: "most prolific", likes: 3 },
  { title: "blog4", author: "most prolific", likes: 4 },

  { title: "blog75", author: "best loved", likes: 75 },
  { title: "blog76", author: "best loved", likes: 76 },

  { title: "blog100", author: "golden book award", likes: 100 },
];

describe("4.4) total likes", () => {
  test("of empty list is zero", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });
  test("when list has only one blog equals the likes of that", () => {
    expect(listHelper.totalLikes([SAMPLE_BLOGS[1]])).toBe(2);
  });
  test("of a bigger list is calculated right", () => {
    expect(listHelper.totalLikes(SAMPLE_BLOGS)).toBe(261);
  });
});
describe("4.5) favorite blog", () => {
  test("of empty list is null", () => {
    expect(listHelper.favoriteBlog([])).toBe(null);
  });
  test("when list has only one blog equals the blog", () => {
    expect(listHelper.favoriteBlog([SAMPLE_BLOGS[1]])).toEqual(SAMPLE_BLOGS[1]);
  });
  test("of a bigger list is calculated right", () => {
    expect(listHelper.favoriteBlog(SAMPLE_BLOGS)).toEqual(
      SAMPLE_BLOGS[SAMPLE_BLOGS.length - 1]
    );
  });
});

describe("4.6) most blogs", () => {
  test("of empty list is null", () => {
    expect(listHelper.mostBlogs([])).toBe(null);
  });
  test("when list has only one blog equals the author of that", () => {
    const ONE_BLOG = SAMPLE_BLOGS[1];
    answer = listHelper.mostBlogs([ONE_BLOG]);
    expect(answer).toEqual({ author: ONE_BLOG.author, blogs: 1 });
  });
  test("of a bigger list is calculated right", () => {
    expect(listHelper.mostBlogs(SAMPLE_BLOGS)).toEqual({
      author: "most prolific",
      blogs: 3,
    });
  });
});

describe("4.7) most likes", () => {
  test("of empty list is null", () => {
    expect(listHelper.mostLikes([])).toBe(null);
  });
  test("when list has only one blog equals the author of that", () => {
    const ONE_BLOG = SAMPLE_BLOGS[1];
    answer = listHelper.mostLikes([ONE_BLOG]);
    expect(answer).toEqual({ author: ONE_BLOG.author, likes: ONE_BLOG.likes });
  });
  test("of a bigger list is calculated right", () => {
    expect(listHelper.mostLikes(SAMPLE_BLOGS)).toEqual({
      author: "best loved",
      likes: 151,
    });
  });
});
