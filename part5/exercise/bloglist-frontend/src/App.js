import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//SERVICES
import jwt from 'jwt-decode'
import blogService from './services/blogs'

//COMPONENTS
import Blog from './components/Blog'
import { NotificationMessage } from './components/notifications'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import RenderLoginForm from './components/Login'

//REDUCERS
import { logoutAction, setUser } from './reducers/loginReducer'
import { setNotifications } from './reducers/notificationReducer'
import { getAllBlogs, addBlogAction } from './reducers/blogsReducer'


const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state=>state.allBlogs)

  const user = useSelector(state => state.loggedUser)
  const notifyMessage = useSelector(state => state.notifications)

  const [tokenId, setTokenId] = useState('')

  useEffect(() => {
    const loggedIn = localStorage.getItem('user')
    if (loggedIn) {
      const user = JSON.parse(loggedIn)
      dispatch(setUser(user))
      dispatch(getAllBlogs())
      blogService.setToken(user.token)
      const authenticatedUser = JSON.parse(localStorage.getItem('user'))
      const decoded = jwt(authenticatedUser.token)
      setTokenId(decoded.id)
    }
  }, [dispatch])

  ///////// LOGOUT
  const onLogoutClick = () => {
    try {
      dispatch(logoutAction())
      dispatch(setNotifications('Log out successfully!', 3000, 'success'))
    } catch (e) {
      console.log(e)
    }
  }

  ///////// BLOGS
  const blogFormRef = useRef()

  const createNewBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()

    try {
      dispatch(addBlogAction(blog))
      return blogs.sort((a, b) => {
        return b.likes - a.likes
      })
    } catch (e) {
      console.log(e)
      //dispatch(setErrorNotification('Wrong or missing authorization!'))
    }
  }

  const renderBlogList = () => {
    return (
      <>
        <h2>blogs</h2>
        <div>
          <div>
            {user.username} logged in!
            <button onClick={onLogoutClick}>Log out!</button>
          </div>
          <h2>Create a new blog</h2>
          <Toggleable buttonLabel='Create new blog' buttonCancel='Cancel' ref={blogFormRef}>
            <BlogForm
              createBlog={createNewBlog}
            />
          </Toggleable>
        </div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} tokenId={tokenId} blogs={blogs}/>
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
        {!user ? <RenderLoginForm /> : renderBlogList()}
      </div>
    </div>
  )
}

export default App