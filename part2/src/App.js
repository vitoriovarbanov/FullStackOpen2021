import React, { useState, useEffect } from 'react'
//import axios from 'axios'

///// 1

/* import Course from './components/Course'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <h1>Web Development Curriculum</h1>
      <div>
        {courses.map(course => {
          return <Course key={course.id} course={course} />
        })}
      </div>
    </>
  )
} */


/////////////////////////  2

import Persons from './components/Phonebook/Persons'
import Search from './components/Phonebook/Search'
import PersonForm from './components/Phonebook/PersonForm'

import phonebookAPI from './services/phonebookAPI'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchRes, setSearchRes] = useState([])

  useEffect(() => initialLoad(), [])

  const initialLoad = () => {
    phonebookAPI
      .getAll()
      .then(data => {
        setPersons(data)
        setSearchRes(data)
      })
  }

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value || '')
    let filteredPersons = persons.filter(x => x.name.toUpperCase().includes(e.target.value.toUpperCase()))
    setSearchRes(filteredPersons)
  }

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number
    }

    const duplicatePersons = persons.find(x => x.name === personObject.name)
    if (duplicatePersons) {
      let updatedPersonObject = {...duplicatePersons,...personObject}
      window.confirm(`${duplicatePersons.name} is already added to phonebook, replace the old number with new one?`)
      phonebookAPI
        .updateNumber(duplicatePersons.id, updatedPersonObject)
        .then(data => {
          console.log(data)
          initialLoad()
        })
        .catch(err=>console.log(err))
    } else {
      phonebookAPI
        .addPersonToPhonebook(personObject)
        .then(data => {
          console.log(data)
          setPersons(persons.concat(data))
          setSearchRes(persons.concat(data))
        })
      setNewName('')
      setNewNumber('')
    }
  }

  const deleteContact = (id, name) => {
    window.confirm(`Delete ${name}?`)
    phonebookAPI
      .deletePerson(id)
      .then(data => {
        initialLoad()
        console.log(`Entry successfully deleted!`)
      })
      .catch(err => console.log(err))
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search
        searchTerm={searchTerm}
        handleSearchTerm={handleSearchTerm}

      />
      <h3>Add new</h3>
      <PersonForm
        addPerson={addPerson}
        personName={newName}
        personNumber={number}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        {searchRes.map(person => {
          return <Persons key={person.id} person={person} deleteContact={() => deleteContact(person.id, person.name)} />
        })}
      </div>
    </div>
  )
}


export default App


////////////////////////////// 3

/* import DisplayCountries from './components/Countries/DisplayCountries'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])

  const handleSearchRequest = (e) => {
    setSearchTerm(e.target.value)
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(data => {
        const allCountriesArray = data.data
        const filtered = allCountriesArray.filter(x => x.name.toUpperCase().includes(e.target.value.toUpperCase()))
        setCountries(filtered)
      })

  }

  return (
    <div>
      <p>Find Countries</p>
      <input value={searchTerm} onChange={handleSearchRequest} placeholder="Start typing to find a country" />
      <DisplayCountries countries={countries}/>
    </div>
  )
}


export default App  */