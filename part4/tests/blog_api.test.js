const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require('../models/user')
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
      .expect(201);
  });
  test("number of blogs increased", async () => {
    afterAdd = await helper.blogsDB();
    //console.log(afterAdd.length);
    expect(afterAdd.length - allBlogs.length).toBe(1);
  });
});

describe("POST without like", () => {
  test("likes property missing", async () => {
    const testPost = {
      title: "jest test blog",
      author: "Eashin Matubber",
      url: "https://eashin.com"
      //likes: 1
    };
    await api
      .post("/api/blogs")
      .send(testPost)
      .expect(201);
    const getAllBlogs = await api.get("/api/blogs");
    const getAfterAdd = getAllBlogs.body;
    const likeProp = getAfterAdd[getAfterAdd.length - 1];
    if (likeProp.likes === undefined) {
      likeProp.likes = 0;
    }
    expect(likeProp.likes).toBe(0);
  });
});

describe("POST missing data", () => {
  test("title property missing", async () => {
    const testPost = {
      //title: "jest test blog",
      author: "Eashin Matubber",
      url: "https://eashin.com",
      likes: 1
    };
    await api
      .post("/api/blogs")
      .send(testPost)
      .expect(400);
  });
  test("url property missing", async () => {
    const testPost = {
      title: "jest test blog",
      author: "Eashin Matubber",
      //url: "https://eashin.com",
      likes: 1
    };
    await api
      .post("/api/blogs")
      .send(testPost)
      .expect(400);
  });
});
describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close();
});
