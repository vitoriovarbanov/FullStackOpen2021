import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const fetchAnecdotes = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const addNewAnecdote = async (content) => {
    const anecdoteObject = {content, votes: 0}
    const response = await axios.post(baseUrl, anecdoteObject)
    return response.data
}

export default { fetchAnecdotes, addNewAnecdote }