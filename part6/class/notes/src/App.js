import React from 'react'
import { createNote, toggleImportanceOf } from './noteReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  const addNote = (e) => {
    e.preventDefault()
    const content = e.target.note.value
    e.target.note.value = ''
    dispatch(createNote(content))
  }

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }

  return (
    <div className="App">
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <ul>
        {store.getState().map(note => {
          return <li key={note.id} onClick={() => { toggleImportance(note.id) }}>{note.content} <strong>{note.important ? 'important' : ''}</strong></li>
        })}
      </ul>
    </div>
  );
}

export default App;
