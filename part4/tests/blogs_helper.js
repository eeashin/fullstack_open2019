const Blog = require("../models/blog");
const User = require('../models/user')

const testBlogs = [
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  }
];

const removedId = async () => {
  const blog = new Blog({ title: "removedId" });
  await blog.save();
  await blog.remove();
  return blog._id.toString();
};

const blogsDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  testBlogs,
  removedId,
  blogsDB,
  usersInDb
};
