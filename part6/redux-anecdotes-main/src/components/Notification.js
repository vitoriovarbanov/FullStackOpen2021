import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'pink',
    marginBottom: '10px'
  }
  return (
    <div style={!notification ? {display: 'none'} : style}>
      {notification}
    </div>
  )
}

export default Notification