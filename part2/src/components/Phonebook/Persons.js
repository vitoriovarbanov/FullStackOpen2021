import React from 'react'

const Persons = ({ person, deleteContact }) => {

  return (
    <>
      <p>{person.name} {person.number}<button value={person.id} key={person.id} onClick={deleteContact}>Delete</button></p>
    </>
  )
}

export default Persons