import React from 'react'
import Togglable from './Togglable'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
  backgroundColor: '#9ad5fb'
}

const Blog = ({ blog, like, removeBlog }) => (
  <Togglable buttonLabel={blog.title}>
    <div style={blogStyle}>
      <p>{blog.title}</p>
      <a href={blog.url} target='blank'>{blog.url}</a>
      <p>{blog.likes} likes <button onClick={() => like(blog)}>Like</button></p>
      <p>{blog.author}</p>
      {
        blog.user
          ?
          <button onClick={(event) => removeBlog(event, blog)}>remove</button>
          :
          null
      }

    </div>
  </Togglable>
)

export default Blog
