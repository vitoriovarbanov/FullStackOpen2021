import React from 'react';
import Toggleable from '../components/Toggleable'
import blogService from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux';

import { likeBlogAction, removeBlogAction } from '../reducers/blogsReducer'

import jwt from 'jwt-decode'

const Blog = ({ blog, getAllBLogs, tokenId }) => {
  const user = useSelector(state => state.loggedUser)
  const decoded = jwt(user.token)

  const dispatch = useDispatch()

  const addBlogLike = async (id) => {
    try {
      dispatch(likeBlogAction(blog, blog.id))
    } catch (e) {
      console.log(e)
    }
  }

  const removeBlog = async (id) => {
    if (window.confirm(`Delete this blog?`)) {
      try {
        dispatch(removeBlogAction(id))
      } catch (e) {
        console.log(e)
      }
    }
  }

  const styledDiv = {
    border: '1px solid black',
    margin: '5px',
    borderRadius: '5px'
  }

  return (
    <div style={styledDiv}>
      {blog.title}
      <Toggleable buttonLabel='Show details' buttonCancel='Hide'>
        <div>
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes}<button key={blog.id} onClick={() => { addBlogLike(blog.id) }} style={{ margin: '5px' }}>Like</button></p>
          <p>{blog.author}</p>
        </div>
        <div>
          {
            tokenId === decoded.id 
            ? <button onClick={() => { removeBlog(blog.id) }} style={{ marginBottom: '10px', backgroundColor: 'red' }}>Remove</button> 
            : ''
            
          }
        </div>
      </Toggleable>
    </div>
  )
}

export default Blog