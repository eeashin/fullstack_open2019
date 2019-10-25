const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./blogs_helper");
const api = supertest(app);

beforeAll(async () => {
  await Blog.deleteMany({});
  for (blogs of helper.testBlogs) {
    await new Blog(blogs).save();
  }
});

describe("blogs api", () => {
  test("blogs are json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("HTTP GET /api/blogs", () => {
  test("number of blogs", async () => {
    const response = await api.get("/api/blogs").expect(200);
    expect(response.body).toHaveLength(helper.testBlogs.length);
  });
  test("blog id", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

describe("HTTP POST api/blogs", () => {
  let allBlogs;
  let afterAdd;
  test("POST success", async () => {
    allBlogs = await helper.blogsDB();
    //console.log(allBlogs.length);
    const testPost = {
      title: "jest test blog",
      author: "Eashin Matubber",
      url: "https://eashin.com",
      likes: 1
    };
    await api
      .post("/api/blogs")
      .send(testPost)
      .expect(200);
  });
  test("number of blogs increased", async () => {
    afterAdd = await helper.blogsDB();
    //console.log(afterAdd.length);
    expect(afterAdd.length - allBlogs.length).toBe(1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
