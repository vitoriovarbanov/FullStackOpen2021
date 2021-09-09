import React from 'react'

const SuccessMsg = ({message}) => {
    const divStyle = {
        color: 'green',
        border: '1px solid green',
        width: '100%',
        height: '50px'
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

const ErrorMsg = ({message}) => {
    const divStyle = {
        color: 'red',
        border: '1px solid red',
        width: '100%',
        height: '50px'
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
    SuccessMsg, ErrorMsg
}