import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notication from './components/Notification'
import FilterForm from './components/FilterForm'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notication />
      <FilterForm />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App