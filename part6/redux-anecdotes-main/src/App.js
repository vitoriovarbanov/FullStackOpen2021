import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notication from './components/Notification'
import FilterForm from './components/FilterForm'
import { useDispatch } from 'react-redux'
import anecdotesService from './services/anecdotesService'
import { getAnectodesArray } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAnectodesArray())
  },[dispatch])

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