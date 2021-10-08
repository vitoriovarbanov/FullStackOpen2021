import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addBlogPost = async (blog) => {
  const config = {
    headers: { authorization: token }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const addLike = async (blog, id) => {
  const config = {
    headers: { authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${id}`, blog, config)

  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)

  return response.data
}

export default { getAll, addBlogPost, setToken, getById, addLike, deleteBlog }