import React, { useState, useEffect } from 'react';
import Toggleable from '../components/Toggleable'
import blogService from '../services/blogs'

import PropTypes from 'prop-types'

const Blog = ({ blog, getAllBLogs, tokenId }) => {
  const [likes, setLikes] = useState(null)

  const [creator, setCreator ] = useState('')

  useEffect(() => {
    async function fetchData() {
      const neededBlog = await blogService.getById(blog.id)
      setLikes(neededBlog.likes)
      setCreator(neededBlog.user)
    }
    fetchData()
  })

  const addBlogLike = async (id) => {
    try {
      const neededBlog = await blogService.getById(id)
      let likes = neededBlog.likes
      if (!likes) {
        likes = 1;
      } else {
        likes++
      }

      const updatedBlog = await blogService.addLike({
        title: neededBlog.title,
        likes,
        author: neededBlog.author,
        url: neededBlog.url,
        user: neededBlog.user
      }, neededBlog.id)

      setLikes(updatedBlog.likes)
    } catch (e) {

    }
  }

  const removeBlog = async (id) => {
    if (window.confirm(`Delete this blog?`)) {
      try {
        const neededBlog = await blogService.deleteBlog(id)
        console.log(neededBlog)
        getAllBLogs()
      } catch (e) {
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
          <p>Likes: {likes}<button key={blog.id} onClick={() => { addBlogLike(blog.id) }} style={{ margin: '5px' }}>Like</button></p>
          <p>{blog.author}</p>
        </div>
        <div>
          {
            tokenId === creator ? <button onClick={() => { removeBlog(blog.id) }} style={{ marginBottom: '10px', backgroundColor: 'red' }}>Remove</button> : ''
          }          
        </div>
      </Toggleable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  getAllBLogs: PropTypes.func.isRequired,
  tokenId: PropTypes.string.isRequired
}

export default Blog