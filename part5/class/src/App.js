import React, { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'

import noteService from './services/notes'
import loginService from './services/login'

import LoginForm from './components/Login'
import Toggable from './components/Toggable'
import NoteForm from './components/NoteForm'

const App = () => {
  const [notes, setNotes] = useState([])

  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedIn = window.localStorage.getItem('loggedUser')
    if (loggedIn) {
      const user = JSON.parse(loggedIn)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }


  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.loginRequest({ username, password })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('logging in with', username, password)
    } catch (e) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
          .create(noteObject)
          .then(returnedNote => {
            setNotes(notes.concat(returnedNote))
          })
  }

  const noteForm = () => {
    return (
      <div>
        <Toggable buttonLabel='New Note' ref={noteFormRef}>
          <NoteForm
            createNote={addNote}
          />
        </Toggable>
      </div>
    )
  }

  const loginForm = () => {
    return (
      <div>
        <Toggable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        </Toggable>
      </div>
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? loginForm() : ''}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      {user !== null ? noteForm() : ''}
      <Footer />
    </div>
  )
}

export default App