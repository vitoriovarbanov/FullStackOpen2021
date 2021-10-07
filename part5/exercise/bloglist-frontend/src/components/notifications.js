import React from 'react'

const NotificationMessage = ({message,msgType}) => {
    const messageColor = msgType === 'error' ? 'red' : 'green';
    const divStyle = {
        color: messageColor,
        border: '1px solid black',
        width: '100%',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10px'
    };

    if(!message){
        return <></>
    }

    return(
        <div style={divStyle}>
            {message}
        </div>
    )
}

export {
    NotificationMessage
}