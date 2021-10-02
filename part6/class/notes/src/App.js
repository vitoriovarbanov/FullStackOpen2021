import React, { useEffect } from 'react'
import NoteForm from './NoteForm'
import Notes from './Notes'
import VisibilityFilter from './components/VisibilityFilter'
import { useDispatch } from 'react-redux'

import noteService from './services/notes'
import { initNotes } from './noteReducer'

const App = () => {
  const filterSelected = (value) => {
    console.log(value)
  }

  const dispatch = useDispatch()
  useEffect(()=>{
    noteService
      .getAll().then(notes=>dispatch(initNotes(notes)))
  },[dispatch])

  return (
    <div>
      <NoteForm />
      <div>
        <VisibilityFilter />
      </div>
      <Notes />
    </div>
  );
}

export default App;
