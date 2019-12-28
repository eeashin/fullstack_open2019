const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require('../models/user')
const jwt = require('jsonwebtoken')

//GET all blogs
blogsRouter.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, password: 1 })
    response.json(blogs.map(blog => blog.toJSON()));
  } catch (error) {
    next(error);
  }
});

//GET blog by id
blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog.toJSON());
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

//POST blog

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response
        .status(401)
        .json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id,
      likes: body.likes
    });
    if (!blog.title || !blog.author || !blog.url) {
      response.status(400).send('mandatory data fields missing');
    } else if (!body.likes) {
      blog.likes = 0;
    }
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON());

    console.log("user for id", body)
    // const user = await User.findById(body.uId)
    console.log("USER:",user)
    console.log("BLOG", blog)
    } catch (error) {
      next(error);
    }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const updateBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };
  try {
    await Blog.findByIdAndUpdate(request.params.id, updateBlog)
    response.status(201).send();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
