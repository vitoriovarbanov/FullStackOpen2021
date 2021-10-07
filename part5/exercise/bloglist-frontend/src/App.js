import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

import { NotificationMessage } from './components/notifications'
import { useDispatch, useSelector } from 'react-redux'

import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'

import jwt from 'jwt-decode'
//REDUCERS
import { setStoreUsername } from './reducers/usernameReducer'
import { setPasswordAction } from './reducers/passwordReducer'
import { loginAction, logoutAction, setUser } from './reducers/loginReducer'
import { setNotifications } from './reducers/notificationReducer'


const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])

  const username = useSelector(state => state.username)
  const password = useSelector(state => state.password)
  const user = useSelector(state => state.loggedUser)

  const notifyMessage = useSelector(state => state.notifications)

  const [tokenId, setTokenId] = useState('')

  useEffect(() => {
    getAllBLogs()
  }, [])

  const getAllBLogs = () => {
    blogService.getAll().then(blogs => {
      const sorted = blogs.sort((a, b) => {
        return b.likes - a.likes
      })
      setBlogs(sorted)
    }
    )
  }

  useEffect(() => {
    const loggedIn = localStorage.getItem('user')
    if (loggedIn) {
      const user = JSON.parse(loggedIn)
      dispatch(setUser(user))
      blogService.setToken(user.token)
      const authenticatedUser = JSON.parse(localStorage.getItem('user'))
      const decoded = jwt(authenticatedUser.token)
      setTokenId(decoded.id)
    }
  }, [dispatch])

  ///////// LOGIN
  const handleLogin = async (e) => {
    e.preventDefault()
    const credentials = {
      username,
      password
    }
    dispatch(loginAction(credentials))
    dispatch(setStoreUsername(''))
    dispatch(setPasswordAction(''))

  }

  const onLogoutClick = () => {
    try{
      dispatch(logoutAction())
      dispatch(setNotifications('Log out successfully!', 3000, 'success'))
    }catch(e){
      console.log(e)
    }
    
  }

  const handleUsernameSet = (e) => {
    e.preventDefault()
    dispatch(setStoreUsername(e.target.value))
  }

  const handlePasswordSet = (e) => {
    e.preventDefault()
    dispatch(setPasswordAction(e.target.value))
  }

  const renderLoginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          Username: <input onChange={(handleUsernameSet)} />
        </div>
        <div>
          Password: <input type='password' onChange={handlePasswordSet} />
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
        return b.likes - a.likes
      })
      setBlogs(sorted.concat(res))
      getAllBLogs()
    } catch (e) {
      console.log(e)
      //dispatch(setErrorNotification('Wrong or missing authorization!'))
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
          <Blog key={blog.id} blog={blog} getAllBLogs={getAllBLogs} tokenId={tokenId} />
        )}
      </>
    )
  }

  return (
    <div>
      <div>
        <NotificationMessage message={notifyMessage.message} msgType={notifyMessage.msgType} />
      </div>
      <div>
        {!user ? renderLoginForm() : renderBlogList()}
      </div>
    </div>
  )
}

export default App