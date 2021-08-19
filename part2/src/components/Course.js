import React from 'react'

const Course = ({ course }) => {
  const total = course.parts.reduce((acc,curr)=>{
    return acc + curr.exercises
  },0)


  return (
    <>
      <h3>{course.name}</h3>
      <div>
        {course.parts.map(part =>
          <p key={part.id}>{part.name} {part.exercises}</p>
        )}
      </div>
        <p>Total of {total} exercises!</p>
    </>
  )
}

export default Course