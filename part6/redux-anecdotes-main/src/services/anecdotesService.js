import axios from 'axios'
import { connect } from 'react-redux'

const baseUrl = 'http://localhost:3001/anecdotes'

const fetchAnecdotes = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const addNewAnecdote = async (content) => {
    const anecdoteObject = { content, votes: 0 }
    const response = await axios.post(baseUrl, anecdoteObject)
    return response.data
}

const updateVotes = async (id) => {
    const allAnecdotes = await axios.get(baseUrl)
    const neededAnecdote = allAnecdotes.data.find(x=>x.id === id)
    console.log(neededAnecdote)
    const votes = neededAnecdote.votes + 1
    const updatedAnecdote = {...neededAnecdote, votes}
    console.log(updatedAnecdote)
    const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    return response.data
}

export default { fetchAnecdotes, addNewAnecdote, updateVotes }