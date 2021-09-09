import axios from 'axios'
const baseUrl = '/api/users/login'

const login = async (body) => {
    const response = await axios.post(baseUrl,body)
    return response.data
}

export default {
    login
}