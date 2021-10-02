const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const voteForAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'CREATE_ANECDOTE',
    data: content
  }
}

/*  export const filterAnecdotes = (term) => {
  return {
    type: 'FILTER_ALL', 
    term
  }
} */

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const neededAnecdote = state.find(x => x.id === id)
      const votes = neededAnecdote.votes + 1;
      const updatedAnecdote = { ...neededAnecdote, votes }
      const newState = state.map(x => x.id === id ? { ...x, ...updatedAnecdote } : x).sort((a, b) => b.votes - a.votes)
      return newState;
    case 'CREATE_ANECDOTE':
      const anecdoteToObj = asObject(action.data)
      return state.concat(anecdoteToObj).sort((a, b) => b.votes - a.votes)
    /* case 'FILTER_ALL':
      const searchTerm = action.term
      if(searchTerm===''){
        return initialState
      }
      const filtered = state.filter(x=>x.content.includes(searchTerm))
      return filtered */
    default:
      return state
  }
}

export default reducer