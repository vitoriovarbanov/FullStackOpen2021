import React from 'react'

const Search = ({ searchTerm, handleSearchTerm }) => {
  
  return (
    <>
      <div>
          Search for a person
      </div> 
      <input value={searchTerm} onChange={handleSearchTerm}/>
    </>
  )
}

export default Search