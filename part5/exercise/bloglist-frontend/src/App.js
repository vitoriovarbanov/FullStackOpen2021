import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { SuccessMsg, ErrorMsg } from './components/notifications'

import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sorted = blogs.sort((a, b) => {
        return b.likes-a.likes
      })
      setBlogs(sorted)
    }
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


  ///////// LOGIN
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
      setSuccessMsg(`User logged in - ${loggedUser.username}`)
      setTimeout(() => {
        setSuccessMsg('')
      }, 4000)
    } catch (err) {
      setErrorMsg('Wrong username or password!')
      setTimeout(() => {
        setErrorMsg('')
      }, 4000)
    }
  }

  const onLogoutClick = () => {
    localStorage.clear()
    setUser(null)
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

  ///////// BLOGS

  const blogFormRef = useRef()

  const createNewBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()

    try {
      const res = await blogService.addBlogPost(blog)
      const sorted = blogs.sort((a, b) => {
        return b.likes-a.likes
      })
      setBlogs(sorted.concat(res))
    } catch (e) {
      setErrorMsg('Wrong or missing authorization!')
      setTimeout(() => {
        setErrorMsg('')
      }, 4000)
    }
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
          <Toggleable buttonLabel='Create new blog' buttonCancel='Cancel' ref={blogFormRef}>
            <BlogForm
              createBlog={createNewBlog}
            />
          </Toggleable>
        </div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </>
    )
  }

  return (
    <div>
      <div>
        <SuccessMsg message={successMsg} />
      </div>
      <div>
        <ErrorMsg message={errorMsg} />
      </div>
      <div>
        {!user ? renderLoginForm() : renderBlogList()}
      </div>
    </div>
  )
}

export default App