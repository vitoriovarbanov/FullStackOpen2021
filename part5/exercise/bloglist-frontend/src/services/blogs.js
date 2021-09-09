import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlogPost = async (blog) => {
  const config = {
    headers: {authorization: token}
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

export default { getAll, addBlogPost, setToken }