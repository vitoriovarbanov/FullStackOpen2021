import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState(0)

    const handleAuthorChange = (e) => {
        setAuthor(e.target.value)
    }

    const handleUrlChange = (e) => {
        setUrl(e.target.value)
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleLikesChange = (e) => {
        setLikes(e.target.value)
    }


    const addBlog = (e) => {
        e.preventDefault()
        createBlog({
          title,
          author,
          url,
          likes
        })

        setTitle('')
        setAuthor('')
        setUrl('') 
    }

    return (
        <>
            <form onSubmit={addBlog}>
                <div>
                    Title: <input type='text' value={title} onChange={handleTitleChange} />
                </div>
                <div>
                    Author: <input type='text' value={author} onChange={handleAuthorChange} />
                </div>
                <div>
                    URL: <input type='text' value={url} onChange={handleUrlChange} />
                </div>
                <div>
                    Likes: <input type='number' value={likes} onChange={handleLikesChange} />
                </div>
                <button type='submit'>Create new blog</button>
            </form>
        </>
    )
}

export default BlogForm