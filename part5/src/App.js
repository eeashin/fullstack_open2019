import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notify, setNotify] = useState('')
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = React.createRef()

  const showNotify = async (message) => {
    setNotify(message)
    const notify = setTimeout(() => {
      setNotify('')
    }, 3000)
  }

  useEffect(() => {
    blogService.getAll()
      .then(res => setBlogs(res))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('logged')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('logged', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername(username)
      setPassword('')
    } catch (exception) {
      showNotify('Invalid username or password')
      setTimeout(() => {
      }, 5000)
    }
  }
  const blogLikes = async (newObj) => {
    const blogObj = {
      id: newObj.id,
      author: newObj.author,
      title: newObj.title,
      url: newObj.url,
      likes: newObj.likes + 1
    }

    const updatedBlog = await blogService.update(blogObj.id, blogObj)
    setBlogs(blogs.filter(
      blog => blog.id !== blogObj.id
    ).concat(blogObj))
  }

  const blogRows = () =>
    blogs.map(blog => {
      return <Blog key={blog.id} blog={blog} like={blogLikes} />
    })

  const logout = () => {
    window.localStorage.removeItem('logged')
    setUser(null)
  }

  const handleBlog = async (event) => {
    event.preventDefault()
    const blogObj = {
      title: title,
      author: author,
      url: url
    }

    const newBlog = await blogService.create(blogObj)
    showNotify('New Blog Saved')
    setBlogs(blogs.concat(newBlog))
  }
  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrl = (event) => {
    setUrl(event.target.value)
  }

  return (
    <div>
      <Notify message={notify} />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
          <div>
            <h1>Blogs</h1>
            <p>
              {user.name} logged in <button onClick={logout}>Logout</button>
            </p>
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
              <BlogForm
                handleBlog={handleBlog}
                title={title}
                author={author}
                url={url}
                handleTitle={handleTitle}
                handleAuthor={handleAuthor}
                handleUrl={handleUrl}

              />
            </Togglable>
            {blogRows(() => blogService.getAll())}
          </div>
        )
      }

    </div>
  )

}
export default App;
