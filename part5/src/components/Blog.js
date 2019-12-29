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

const Blog = ({ blog, like, removeBlog}) => (
  <Togglable buttonLabel={blog.title}>
    <div style={blogStyle}>
      <p>{blog.title}</p>
      <p>{blog.url}</p>
      <p>{blog.likes} likes <button onClick={() => like(blog)}>Like</button></p>
      <p>{blog.author}</p>
      <p><button onClick={(event) => removeBlog(event, blog)}>remove</button></p>
    </div>
  </Togglable>
)
 
export default Blog
