import { cleanup, render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { expect } from "vitest";
import { url } from "inspector";
import userEvent from "@testing-library/user-event";

import BlogForm from "./BlogForm";

describe("5:13 Blog Component short display", () => {
  const SAMPLE_BLOG = {
    title: "the title",
    author: "bobert",
    url: "http://www.google.com",
    likes: 5,
  };

  test("renders title", () => {
    const blog = SAMPLE_BLOG;
    render(<Blog blog={blog} />);
    const title_element = screen.getByText(blog.title);
    expect(title_element).toBeDefined();
  });

  test("renders author", () => {
    const blog = SAMPLE_BLOG;
    render(<Blog blog={blog} />);
    // console.log("before");
    // screen.debug();
    const author_element = screen.getByText(blog.author);
    // console.log("after");

    expect(author_element).toBeDefined();
  });

  test("does not render url", () => {
    const blog = SAMPLE_BLOG;
    const { container } = render(<Blog blog={blog} />);

    const url_element = container.querySelector(".url");
    const parent_div = url_element.parentElement;
    expect(parent_div.style.display).toBe("none");
  });

  test("does not render likes", () => {
    const blog = SAMPLE_BLOG;
    render(<Blog blog={blog} />);
    const likes_element = screen.queryByText(blog.likes);
    const parent_div = likes_element.parentElement;
    expect(parent_div.style.display).toBe("none");
  });
});

describe("5:14 Blog Component single expand button press", () => {
  const SAMPLE_BLOG = {
    title: "the title",
    author: "bobert",
    url: "http://www.google.com",
    likes: 5,
  };
  test("likes are shown when view is clicked", () => {
    const blog = SAMPLE_BLOG;
    const { container } = render(<Blog blog={blog} />);
    const button = container.querySelector(".view");
    button.click();
    const likes_element = screen.getByText(blog.likes);
    const parent_div = likes_element.parentElement;
    expect(parent_div.style.display).toBe("block");
  });
  test("url are shown when view is clicked", () => {
    const blog = SAMPLE_BLOG;
    const { container } = render(<Blog blog={blog} />);
    const button = container.querySelector(".view");
    button.click();
    const url_element = screen.getByText(blog.url);
    const parent_div = url_element.parentElement;
    expect(parent_div.style.display).toBe("block");
  });
  test("urls are shown when view is clicked", () => {
    const blog = SAMPLE_BLOG;

    const mockOnClick = vi.fn();
    const { container } = render(<Blog blog={blog} />);
    const button = container.querySelector(".view");
    button.onclick = mockOnClick;
    button.click();
    expect(mockOnClick).toHaveBeenCalled();
  });

  test("button name is change to `hide`", () => {
    const blog = SAMPLE_BLOG;
    const { container } = render(<Blog blog={blog} />);
    const button = container.querySelector(".view");
    button.click();
    expect(button.textContent).toBe("hide");
  });
});

describe("5:15 Blog Component double like button press", () => {
  const SAMPLE_BLOG = {
    title: "the title",
    author: "bobert",
    url: "http://www.google.com",
    likes: 5,
  };
  test("likes are incremented when like is clicked", async () => {
    const blog = SAMPLE_BLOG;

    const { container } = render(<Blog blog={blog} />);
    const button = container.querySelector(".like");
    expect(button).toBeDefined();
    const mockOnClick = vi.fn();
    const user = userEvent.setup();
    button.onclick = mockOnClick;

    // button.click();
    await user.click(button);
    await user.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });
});
describe("5:16 Blog Creation Form", async () => {
  const SAMPLE_BLOG = {
    title: "the title",
    author: "bobert",
    url: "http://www.google.com",
  };
  test("form calls the event handler it received as props with the right details when a new blog is created", async () => {
    const blog = SAMPLE_BLOG;

    const user = userEvent.setup();
    const mockCreateBlog = vi.fn();
    const { container } = render(<BlogForm createBlog={mockCreateBlog} />);
    const title = container.querySelector("#title");
    const author = container.querySelector("#author");
    const url = container.querySelector("#url");
    const form = container.querySelector("#creation");
    //
    await user.type(title, blog.title);
    await user.type(author, blog.author);
    await user.type(url, blog.url);
    await user.click(form);
    expect(mockCreateBlog).toHaveBeenCalledTimes(1);
    expect(mockCreateBlog).toHaveBeenCalledWith(blog);
  });
});
