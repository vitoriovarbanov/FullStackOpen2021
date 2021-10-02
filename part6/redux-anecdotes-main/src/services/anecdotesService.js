import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const fetchAnecdotes = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export default { fetchAnecdotes }