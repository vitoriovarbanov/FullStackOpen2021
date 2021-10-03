import React, { useEffect } from 'react'
import NoteForm from './components/NoteForm'
import Notes from './Notes'
import VisibilityFilter from './components/VisibilityFilter'
import { useDispatch } from 'react-redux'

import { initNotes } from './noteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(initNotes())
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
