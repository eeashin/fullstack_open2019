import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import "./index.css"
import { setNotification } from './reducers/notificationReducer'
import store from './store'

const App = (props) => {
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
    setTimeout(() => {
      setNotify('')
    }, 3000)
  }

  useEffect(() => {
   blogService.getAll().then(res => setBlogs(res))
  }, [])
  blogs.sort((a, b) => b.likes - a.likes);

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
      store.dispatch(setNotification('Invalid username or password'))
    }
  }

  const logout = () => {
    window.localStorage.removeItem('logged')
    setUser(null)
  }
  
  const blogLikes = async (newObj) => {
    const blogObj = {
      id: newObj.id,
      author: newObj.author,
      title: newObj.title,
      url: newObj.url,
      likes: newObj.likes + 1
    }

    await blogService.update(blogObj.id, blogObj)
    setBlogs(blogs.filter(
      blog => blog.id !== blogObj.id
    ).concat(blogObj))
  }

  const removeBlog = async (event, blog) => {
    event.preventDefault()
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog.id).then(response => {
        if(response !== 401) {
          setBlogs(blogs.filter(delBlog => delBlog !== blog))
        }
      })
    }
  }

  const blogRows = () =>
    blogs.map(blog => {
      return <Blog key={blog.id} blog={blog} like={blogLikes} removeBlog={removeBlog} />
    })

  const handleBlog = async (event) => {
    event.preventDefault()
    const blogObj = {
      title: title,
      author: author,
      url: url
    }

    const newBlog = await blogService.create(blogObj)
    store.dispatch(setNotification('New Blog Saved'))
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
    <div className="container">
      <Notify/>
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
