import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notication from './components/Notification'

const App = () => {  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notication />
      <AnecdoteList />
      <AnecdoteForm/>
    </div>
  )
}

export default App