import React from 'react'
import NoteForm from './NoteForm'
import Notes from './Notes'
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {
  const filterSelected = (value) => {
    console.log(value)
  }

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
