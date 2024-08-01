const { test, beforeEach, describe } = require("@playwright/test");
const { log } = require("console");
const exp = require("constants");

const { expect } = test;

const BOBBY = "bobby";
const SECRET = "secret";

const ALICE = "alice";
const ALICE_SECRET = "alice-secret";

const FIRST_BLOG_TITLE = "The very first blog";

// these should go in a helper file
const loginWith = async (page, username, password) => {
  await page.locator('input[type="text"]').fill(username);
  await page.locator('input[type="password"]').fill(password);
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("button", { name: "Logout" });
};

const logoutUser = async (page) => {
  await page.getByRole("button", { name: "Logout" }).click();
  await page.getByRole("button", { name: "Login" });
};
const clearDB = async ({ page, request }) => {
  // console.log("clearDB request", request); //?
  const response = await request.post("http://localhost:5173/api/test/reset", {
    method: "POST",
    headers: {
      // Corrected the capitalization here
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  // console.log("response", response); //?
  expect(response.status()).toBe(204);
};

const createUser = async (request, username, password) => {
  // console.log("createUser", username, password); //?
  const name = `HRH ${username}`;
  const response = await request.post("http://localhost:5173/api/users", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    data: { username, password, name },
  });
  // console.log("response.body", response?.body); //?
  expect(response.status()).toBe(201);

  const checking = await request.get("http://localhost:5173/api/users");
  // console.log("checking.body", checking?.body); //?
};

const createBlog = async (page, blogTitle) => {
  await expect(page.getByText("create new")).toBeVisible();
  await expect(page.getByText("title")).toBeVisible();
  await expect(page.getByText("author")).toBeVisible();

  await page.locator("#author").fill(FIRST_BLOG_TITLE);
  // await page.locator('input[name="author:"]').fill(FIRST_BLOG_TITLE);
  const title = page.locator("#title");
  await title.fill(blogTitle);

  await page.locator("#url").fill("http://www.newblog.com");

  await page.getByRole("button", { name: "Create" }).click();

  const notification = page.locator(".notification", {
    hasText: blogTitle,
  });
  await expect(notification).toBeVisible();

  // await expect(page.getByText(blogTitle, { exact: true })).toBeVisible();
};

const clickByTitle = async (page, the_title) => {
  // const elementWithText = await page.locator(`text=${the_title}`);
  // const elementWithText = await page.locator(".blog");
  // const elementWithText = await page.locator("div");

  const elementWithText = page.getByText(the_title, { exact: true });

  await expect(elementWithText).toBeVisible();

  await expect(elementWithText).toBeTruthy();
  // await expect(elementWithText.tagName()).toBe("div");
  const parentElement = await elementWithText.locator("..");
  // expect(await parentElement.tagName()).toBe("div");
  const descendantWithClass = await parentElement.locator(".like");
  // await expect(descendantWithClass.tagName()).toBe("button");
  await descendantWithClass.click();
};

describe("test the tools themseles", () => {
  test("test the test", async ({ page, request }) => {
    await clearDB({ page, request });
    const response = await page.goto("http://localhost:5173/api/users");
    // console.log("response", response); //?
    expect(response?.status()).toBe(200);

    const the_body_json = await response.json();

    // console.log("the_body_json", the_body_json); //?
    expect(the_body_json).toHaveLength(0);

    await createUser(request, "not-bobby", "not-secret");

    const user_creation_response = await page.goto(
      "http://localhost:5173/api/users"
    );

    expect(user_creation_response.status()).toBe(200);
    const the_creation_body_json = await user_creation_response.json();

    expect(the_creation_body_json).toHaveLength(1);
    expect(the_creation_body_json[0]?.username).toBe("not-bobby");

    await clearDB({ request, page });
    const final_response = await page.goto("http://localhost:5173/api/users");
    expect(final_response?.status()).toBe(200);

    const the_final_body_json = await response.json();

    expect(the_final_body_json).toHaveLength(0);
  });
});

describe("Blog app", () => {
  beforeEach(async ({ request, page }) => {
    await page.goto("http://localhost:5173");
  });

  test("5.17: Login form is shown", async ({ page }) => {
    const locator = page.getByRole("button", { name: "Login" });
    await expect(locator).toBeVisible();
  });
  describe("5.18 when a user exists", () => {
    beforeEach(async ({ request, page }) => {
      await clearDB({ request, page });
      await createUser(request, BOBBY, SECRET);
      await page.goto("http://localhost:5173");
    });
    test("login is permitted with correct credentials", async ({ page }) => {
      // console.log("RLB: starting permitted with correct credentials"); //?
      const locator = await page.getByRole("button", { name: "Login" });
      // console.log("locator", locator); //?

      await expect(locator).toBeVisible();

      await locator.click();

      await page.locator('input[type="text"]').fill(BOBBY);
      await page.locator('input[type="password"]').fill(SECRET);

      await page.getByRole("button", { name: "Login" }).click();

      const logout_button = await page.getByRole("button", { name: "Logout" });

      // console.log("logout_button", logout_button); //? logout_button
      expect(logout_button).toBeTruthy();
      await expect(logout_button).toBeVisible();
    });
    test("login is prevented with wrong credentials", async ({ page }) => {
      const locator = page.getByRole("button", { name: "Login" });

      await expect(locator).toBeVisible();

      await locator.click();

      await page.locator('input[type="text"]').fill(BOBBY);
      await page.locator('input[type="password"]').fill("wrong password");

      await page.getByRole("button", { name: "Login" }).click();

      await expect(page.getByText("Login Failed")).toBeVisible();
    });
    describe("When logged in", () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, BOBBY, SECRET);
      });

      test("5.19: a new blog can be created", async ({ page }) => {
        await expect(page.getByText("create new")).toBeVisible();
        await expect(page.getByText("title")).toBeVisible();
        await expect(page.getByText("author")).toBeVisible();

        await page.locator("#author").fill(FIRST_BLOG_TITLE);
        // await page.locator('input[name="author:"]').fill(FIRST_BLOG_TITLE);
        const title = page.locator("#title");
        await title.fill(FIRST_BLOG_TITLE);

        await page.locator("#url").fill("http://www.newblog.com");

        await page.getByRole("button", { name: "Create" }).click();

        if (false) {
          const notification = page.locator(".notification", {
            hasText: FIRST_BLOG_TITLE,
          });
          await expect(notification).toBeVisible();
        }

        await expect(
          // page.getByText(FIRST_BLOG_TITLE, { exact: true })
          page.locator("div").filter({ hasText: /^The very first blog$/ })
        ).toBeVisible();
      });
      describe("and a blog exists", () => {
        beforeEach(async ({ page }) => {
          await createBlog(page, FIRST_BLOG_TITLE);
        });
        test("5.20: a user can like a blog", async ({ page }) => {
          await page.getByRole("button", { name: "view" }).click();
          await page.getByRole("button", { name: "like" }).click();
          await page.getByText("likes: 1");
        });
        test("5.21: a user can delete a blog", async ({ page }) => {
          await page.getByRole("button", { name: "view" }).click();
          await page.getByRole("button", { name: "delete" }).click();
          await expect(
            //   const elementWithText = await page.locator('div').filter({ hasText: new RegExp(`^${FIRST_BLOG_TITLE}$`) });
            page.locator("div").filter({ hasText: /^The very first blog$/ })
            // page.getByText(FIRST_BLOG_TITLE, { exact: true })
          ).not.toBeVisible();
        });
        describe("5.22: and we are logged in as another user", () => {
          beforeEach(async ({ request, page }) => {
            await createUser(request, ALICE, ALICE_SECRET);
            await logoutUser(page);
            await loginWith(page, ALICE, ALICE_SECRET);
          });
          test("5.22: a user cannot delete a blog created by another user", async ({
            page,
          }) => {
            await expect(
              page.getByRole("button", { name: "delete" })
            ).not.toBeVisible();
          });
        });
      });

      test("5.23 blogs are ordered by likes", async ({ page }) => {
        const target = "blog 2";
        await createBlog(page, "blog 1");
        await createBlog(page, target);
        await createBlog(page, "blog 3");

        // const elementWithText = await page.locator(`text=${the_title}`);
        // const elementWithText = await page.locator(".blog");
        // const elementWithText = await page.locator("div");

        const elementWithText = page.getByText(target, { exact: true });

        await expect(elementWithText).toBeVisible();

        await expect(elementWithText).toBeTruthy();
        // await expect(elementWithText.tagName()).toBe("div");
        const parentElement = await elementWithText.locator("..");
        // expect(await parentElement.tagName()).toBe("div");
        const descendantWithClass = await parentElement.locator(".like");
        // await expect(descendantWithClass.tagName()).toBe("button");
        await descendantWithClass.click();

        console.log("foo");

        //        await page.waitForTimeout(3000);

        const topBlog = await page.locator(".blog").first();
        await expect(topBlog).toBeVisible();

        const descendantWithTarget = await topBlog.locator(
          `:has-text("${target}")`
        );
        await expect(descendantWithTarget).toBeVisible();

        console.log("bar");
        // const elementWithText = await page.locator("div");

        // await expect(page.getByText(target, { exact: true })).toBeVisible();

        // const elementWithText = await page.getByRole("div");
        // console.log("elementWithText", elementWithText); //?
        // expect(await elementWithText.toBeTruthy());
      });
    });
  });
});
