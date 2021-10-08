import blogService from '../services/blogs'
import { setNotifications } from '../reducers/notificationReducer'

export const getAllBlogs = () => dispatch => {
    blogService
        .getAll()
        .then(blogs => {
            dispatch({
                type: 'FETCH_BLOGS',
                payload: blogs
            })
        })
        .catch(err => {
            dispatch(setNotifications(`Couldn't fetch resources!`, 5000, 'error'))
        })
}

export const likeBlogAction = (blog, id) => dispatch => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    blogService
        .addLike(updatedBlog, id)
        .then(likedBlog => {
            dispatch({
                type: 'LIKE_BLOG',
                likedBlog,
                id
            })
        })
}

export const removeBlogAction = (id) => dispatch => {
    blogService
        .deleteBlog(id)
        .then(data => {
            dispatch({
                type: 'DELETE_BLOG',
                id
            })
            dispatch(setNotifications(`Blog successfully removed!`, 3000, 'success'))
        })
        .catch(e => dispatch(setNotifications('Something went wrong! Please try again!', 3000, 'error')))
}

export const addBlogAction = (content) => dispatch => {
    blogService
        .addBlogPost(content)
        .then(data=>{
            dispatch({
                type: 'ADD_BLOG',
                data
            })
        })
}

const blogsReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_BLOGS':
            return action.payload
        case 'LIKE_BLOG':
            return state.map(b => {
                if (b.id !== action.id) {
                    return b
                }
                return {
                    ...action.likedBlog,
                    likes: action.likedBlog.likes
                }
            })
        case 'DELETE_BLOG':
            return [
                ...state.filter(b => b.id !== action.id)
            ]
        case 'ADD_BLOG':
            return [...state.concat(action.data)].sort((a,b)=>{
                return b.likes - a.likes
            })
        default:
            return state
    }
}

export default blogsReducer