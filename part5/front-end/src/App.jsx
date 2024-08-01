import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import NotficationBox from "./components/NotificationBox";

const BLOG_USER_TOKEN_TAG = "loggedBlogappUser";
const NOTIFICATION_DURATION_MS = 2000;

const App = () => {
  const [blogs, rawSetBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("success");

  const setBlogs = (rawBlogs) => {
    rawSetBlogs(rawBlogs.sort((a, b) => b.likes - a.likes));
  };

  const notify = (message, type = "success") => {
    setNotification(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotification(null);
    }, NOTIFICATION_DURATION_MS);
  };

  const report_error = (message) => {
    notify(message, "error");
  };

  const report_success = (message) => {
    notify(message, "success");
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(BLOG_USER_TOKEN_TAG);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = (e) => {
    console.log("logout");
    window.localStorage.removeItem(BLOG_USER_TOKEN_TAG);
    setUser(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      // console.log("user", user);
      window.localStorage.setItem(BLOG_USER_TOKEN_TAG, JSON.stringify(user));
      // console.log("before setToken");
      // console.log("blogService", blogService);
      // console.dir(blogService);
      blogService.setToken(user.token);
      // console.log("after setToken");
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("exception", exception);
      console.error("wrong credentials");
      report_error("Login failed");
    }
  };

  const alterBlog = async (blog) => {
    try {
      console.log("altering blog", blog);
      const new_blog = await blogService.put(blog);
      console.log("new blog", new_blog);
      setBlogs(blogs.map((b) => (b.id === blog.id ? new_blog : b)));
      report_success(`blog ${new_blog.title} updated`);
    } catch (exception) {
      console.log("exception", exception);
      console.error("blog", blog);
      report_error(`blog ${blog.title} update failed`);
    }
  };
  const createBlog = async (blog) => {
    try {
      console.log("creating blog", blog);

      const newBlog = await blogService.create(blog);
      setBlogs(blogs.concat(newBlog));
      report_success(`a new blog ${newBlog.title} by ${newBlog.author} added`);
    } catch (exception) {
      console.log("exception", exception);
      console.error("blog", blog);
      report_error("blog creation failed");
    }
  };

  const removeBlog = async (id) => {
    // console.log("not trying to remove the Blog")
    // return
    try {
      console.log("removing blog", id);
      await blogService.remove(id);
      setBlogs(blogs.filter((b) => b.id !== id));
      report_success(`blog ${id} removed`);
    } catch (exception) {
      console.log("exception", exception);
      console.error("blog", id);
      report_error(`blog ${id} removal failed`);
    }
  };

  console.log("App has", blogs.length, "blogs");
  return (
    <div>
      <h2>blogs !!</h2>
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      ) : (
        <>
          <div>You are logged in as {user.username}</div>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      <NotficationBox notification={notification} kind={notificationType} />
      {user === null || (
        <div>
          <hr />
          <BlogForm createBlog={createBlog} />
        </div>
      )}
      <hr />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          alterBlog={alterBlog}
          removeBlog={removeBlog}
          userid={user?.id}
        />
      ))}
    </div>
  );
};

export default App;
