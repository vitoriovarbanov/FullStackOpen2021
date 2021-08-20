const SuccessNotification = ({ successMsg }) => {
    if (successMsg === '') {
        return <></>
    }
    const successStyle = {
        color: 'green',
        width: '100%',
        height: '50px',
        border: '3px solid green'
    }
    return (
        <div>
            <h1 style={successStyle}>{successMsg}</h1>
        </div>
    )
}

const ErrorNotification = ({ errorMsg }) => {
    if (errorMsg === '') {
        return <></>
    }
    const errorStyle = {
        color: 'red',
        width: '100%',
        height: '50px',
        border: '3px solid red'
    }
    return (
        <div>
            <h1 style={errorStyle}>{errorMsg}</h1>
        </div>
    )
}

export { SuccessNotification, ErrorNotification }
