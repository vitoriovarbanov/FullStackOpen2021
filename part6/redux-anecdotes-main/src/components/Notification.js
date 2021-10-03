import React from 'react'
//import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {
  //const notification = useSelector(state => state.notifications)
  console.log(props.notifications)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'pink',
    marginBottom: '10px'
  }
  return (
    <div style={!props.notifications ? { display: 'none' } : style}>
      {props.notifications}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

const ConnectedNotifcations = connect(mapStateToProps)(Notification)
export default ConnectedNotifcations