import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedIn = localStorage.getItem('user')
    if (loggedIn) {
      const user = JSON.parse(loggedIn)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    const credentials = {
      username,
      password
    }
    try {
      const loggedUser = await loginService.login(credentials)
      localStorage.setItem('user', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      setUsername('')
      setPassword('')
      console.log(`User logging in`, loggedUser)
    } catch (err) {

    }
  }

  const renderLoginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          Username: <input type='text' value={username} onChange={(e) => { setUsername(e.target.value) }} />
        </div>
        <div>
          Password: <input type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <button type='submit'>Login</button>
      </form>
    )
  }

  const renderBlogList = () => {
    const savedUser = localStorage.getItem('user')
    const parsedUser = JSON.parse(savedUser)
    return (
      <>
        <h2>blogs</h2>
        {parsedUser.username} logged in!
        <button onClick={onLogoutClick}>Log out!</button>
        <div>
          <h2>Create a new blog</h2>
          {renderCreateBlogForm()}
        </div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </>
    )
  }

  const renderCreateBlogForm = () => {
    return (
      <>
        <form onSubmit={createNewBlog}>
          <div>
            Title: <input type='text' value={title} onChange={(e) => { setTitle(e.target.value) }} />
          </div>
          <div>
            Author: <input type='text' value={author} onChange={(e) => { setAuthor(e.target.value) }} />
          </div>
          <div>
            URL: <input type='text' value={url} onChange={(e) => { setUrl(e.target.value) }} />
          </div>
          <button type='submit'>Create new blog</button>
        </form>
      </>
    )
  }

  const createNewBlog = async (e) => {
    e.preventDefault()
    const blog = {
      title, author, url
    }

    try {
      const res = await blogService.addBlogPost(blog)
      setBlogs(blogs.concat(res))
    } catch (e) {

    }
  }

  const onLogoutClick = () => {
    localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      <div>
        {!user ? renderLoginForm() : renderBlogList()}
      </div>
    </div>
  )
}

export default App