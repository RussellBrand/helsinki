const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
exports.api = api;

const logger = require("../utils/logger");
const { title } = require("process");
const testHelper = require("./test_helper");

describe("test earlier than 4.13", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two blogs", async () => {
    const response = await api.get("/api/blogs");
    const body = response.body;
    expect(body.length).toBe(2);
  });

  test("the first blog is about HTTP methods", async () => {
    const response = await api.get("/api/blogs");

    const title = response.body.map((e) => e.title);
    // assert.strictEqual(contents.includes("HTML is easy"), true);
    expect(title).toContain("HTML is easy");
  });

  test("id is a string", async () => {
    // return;
    const response = await api.get("/api/blogs");

    const all_ids = response.body.map((e) => e.id);
    const id = all_ids[0];
    expect(id).toBeDefined();
    expect(typeof id).toBe("string");
  });

  test("4.10: Prevent adding blog without an authentiication token", async () => {
    const pre_response = await api.get("/api/blogs");
    const pre_count = pre_response.body.length;
    const newBlog = {
      title: "third title",
      author: "third author",
      url: "http://localhost/third_url.html",
      likes: 3,
    };

    const response = await api.post("/api/blogs").send(newBlog);

    const body = response.body;
    const status = response.status;
    //   console.log("status", status);
    expect(response.status).toBe(401);
    const after_response = await api.get("/api/blogs");

    expect(after_response.body.length).toBe(pre_count);
  });

  test("4:10 A valid blog can be added", async () => {
    // before adding new blog
    const pre_response = await api.get("/api/blogs");
    const pre_count = pre_response.body.length;
    const newBlog = {
      title: "third title",
      author: "third author",
      url: "http://localhost/third_url.html",
      likes: 3,
    };

    const login_token2 = await testHelper.create_login_token();

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${login_token2}`);
    //  console.log("after post");
    //
    // console.log("after post");
    const body = response.body;
    // console.log("body", body);
    const status = response.status;
    //   console.log("status", status);
    expect(response.status).toBe(201);
    const id = response.body.id;
    expect(typeof id).toBe("string");

    const after_response = await api.get("/api/blogs");
    const after_body = after_response.body; // 3
    const after_status = after_response.status; // 200
    expect(after_response.body.map((e) => e.id)).toContain(id);
    const addedBlog = after_response.body.find((e) => e.id === id);
    expect(addedBlog.title).toBe("third title");
    expect(after_response.body.length).toBe(pre_count + 1);
  });

  test("4.12 lack of url should cause error", async () => {
    const pre_response = await api.get("/api/blogs");
    const pre_count = pre_response.body.length;
    const newBlog = {
      title: "i haven't got a URL",
      author: "fred",
    };

    const login_token2 = await testHelper.create_login_token();

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${login_token2}`);
    expect(response.status).toBe(400);

    const after_response = await api.get("/api/blogs");
    const after_count = after_response.body.length;

    expect(pre_count).toBe(after_count);
  });

  test("4.12 lack of tite should cause error", async () => {
    const pre_response = await api.get("/api/blogs");
    const pre_count = pre_response.body.length;
    const newBlog = {
      url: "http//no.title.com",
      author: "fred",
    };

    const login_token2 = await testHelper.create_login_token();

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${login_token2}`);
    expect(response.status).toBe(400);

    const after_response = await api.get("/api/blogs");
    const after_count = after_response.body.length;

    expect(pre_count).toBe(after_count);
  });

  test("4:11 likes default to 0", async () => {
    // before adding new blog
    const pre_response = await api.get("/api/blogs");
    const pre_count = pre_response.body.length;
    const newBlog = {
      title: "third title",
      author: "third author",
      url: "http://localhost/third_url.html",
    };

    const login_token2 = await testHelper.create_login_token();

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${login_token2}`);
    //  console.log("after post");
    //
    // console.log("after post");
    const body = response.body;
    // console.log("body", body);
    const status = response.status;
    //   console.log("status", status);
    expect(response.status).toBe(201);
    const id = response.body.id;
    expect(typeof id).toBe("string");

    const after_response = await api.get("/api/blogs");
    const after_body = after_response.body; // 3
    const after_status = after_response.status; // 200
    expect(after_response.body.map((e) => e.id)).toContain(id);
    const addedBlog = after_response.body.find((e) => e.id === id);
    expect(addedBlog.likes).toBe(0);
    expect(after_response.body.length).toBe(pre_count + 1);
  });
});

test("4.13: delete a blog", async () => {
  const pre_response = await api.get("/api/blogs");
  const pre_count = pre_response.body.length;

  const login_token2 = await testHelper.create_login_token();

  const added_response = await api
    .post("/api/blogs")
    .send({
      title: "Blog to Delete",
      author: "John Doe",
      url: "http://example.com",
      likes: 5,
    })
    .set("Authorization", `Bearer ${login_token2}`);
  const added_body = added_response.body; //
  // console.log("added_body", added_body);
  expect(added_response.status).toBe(201); //?
  const id_to_delete = added_response.body.id; //
  // console.log("id_to_delete", id_to_delete);

  const after_add_response = await api.get("/api/blogs");
  const after_add_count = after_add_response.body.length;

  expect(after_add_count).toBe(pre_count + 1);

  const del_response = await api
    .delete(`/api/blogs/${id_to_delete}`)
    .set("Authorization", `Bearer ${login_token2}`);

  // console.log("del_response.body", del_response.body);

  expect(del_response.status).toBe(204);

  const after_del_response = await api.get("/api/blogs");
  const after_del_count = after_del_response.body.length;

  expect(after_del_count).toBe(pre_count);
});

test("4.14: incrementing likes works", async () => {
  const pre_response = await api.get("/api/blogs");

  const {
    likes: pre_likes,
    title: pre_title,
    url: pre_url,
    author: pre_author,
    id,
  } = pre_response.body[0];

  const pre_body = {
    likes: pre_likes,
    title: pre_title,
    url: pre_url,
    author: pre_author,
    id,
  };

  const new_body = {
    likes: pre_likes + 100,
    title: pre_title,
    url: pre_url,
    author: pre_author,
  };

  const single_blog = await api.get(`/api/blogs/${id}`);

  const {
    likes: single_likes,
    title: single_title,
    url: single_url,
    author: single_author,
    id: single_id,
  } = single_blog.body;

  const single_body = {
    likes: single_likes,
    title: single_title,
    url: single_url,
    author: single_author,
    id: single_id,
  };

  expect(pre_body).toEqual(single_body);

  const response = await api.put(`/api/blogs/${id}`).send(new_body);

  expect(response.status).toBe(200);

  const after_response = await api.get("/api/blogs");

  const {
    likes: after_likes,
    title: after_title,
    url: after_url,
    author: after_author,
  } = after_response.body.find((e) => e.id === id);

  expect(after_likes).toBe(pre_likes + 100);
  expect(after_title).toBe(pre_title);
  expect(after_url).toBe(pre_url);
  expect(after_author).toBe(pre_author);
});

describe("4.15 & 4.16 when there is initially one user in db", () => {
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await testHelper.allUsers();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await testHelper.allUsers();
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("user without usernames should be rejected", async () => {
    const usersAtStart = await testHelper.allUsers();

    const newUser = {
      name: "without username",
      password: "sesame",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await testHelper.allUsers();
    expect(usersAtEnd.length).toBe(usersAtStart.length);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).not.toContain(newUser.username);
  });

  test("user without password should be rejected", async () => {
    const usersAtStart = await testHelper.allUsers();

    const newUser = {
      name: "without password",
      username: "Upasswordless",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await testHelper.allUsers();
    expect(usersAtEnd.length).toBe(usersAtStart.length);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).not.toContain(newUser.username);
  });

  test("user with too short password should be rejected", async () => {
    const usersAtStart = await testHelper.allUsers();

    const newUser = {
      name: "short password",
      username: "Ushortpassword",
      password: "a",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await testHelper.allUsers();
    expect(usersAtEnd.length).toBe(usersAtStart.length);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).not.toContain(newUser.username);
  });
});

test("4.17listing blogs shows users", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body.length).toBeGreaterThan(0);
  response.body.forEach((blog) => {
    // console.log(blog);
    expect(typeof blog.user).toBe("object");
    expect(blog.user).not.toBeNull();
    expect(typeof blog.user.id).toBe("string");
    expect(typeof blog.user.username).toBe("string");
    expect(typeof blog.user.name).toBe("string");
  });
});
