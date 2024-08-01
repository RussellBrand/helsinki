import blogservices from "../services/blogs";
const Blog = ({ blog, alterBlog, userid, removeBlog }) => {
  const toggleDetails = (e) => {
    const details = e.target.parentNode.querySelector(".details");

    if (details.style.display === "none") {
      details.style.display = "block";
      e.target.textContent = "hide";
    } else {
      details.style.display = "none";
      e.target.textContent = "view";
    }
  };

  const likeMe = (e) => {
    console.log("likeMe");
    const new_blog = { ...blog, likes: blog.likes + 1 };
    alterBlog(new_blog);
  };

  const remove = (e) => {
    console.log("remove");
    // console.log("in function: removeBlog", removeBlog); // [Function: removeBlog]
    removeBlog(blog.id);
  };

  ///
  return (
    <div
      style={{
        border: "1px solid black",
        margin: "5px",
        padding: "3px",
        backgroundColor: "lightgrey",
      }}
      className="blog"
    >
      <div style={{ fontWeight: "bold" }}>{blog.title}</div>
      <div>
        By: <span>{blog.author}</span>
      </div>

      <span className="details" style={{ display: "none" }}>
        <div className="url">
          URL: <span>{blog.url}</span>
        </div>
        <div className="likes">
          Likes: <span>{blog.likes}</span>
        </div>

        <div className="user">
          User: <span>{blog.user?.name}</span>
        </div>
      </span>

      <button className="view" onClick={toggleDetails}>
        view
      </button>
      <button className="like" onClick={likeMe}>
        Like
      </button>
      {userid === blog.user?.id ? (
        <button onClick={remove}>Delete</button>
      ) : null}
    </div>
  );
};

export default Blog;
