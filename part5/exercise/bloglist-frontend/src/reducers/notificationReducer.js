export const setNotifications = (message, duration, msgType) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            message,
            msgType
        })
        setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                message: '',
                msgType: ''
            })
        }, duration)
    }
}

const notificationReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            const msg = { message: action.message, msgType: action.msgType }
            return msg
        default:
            return state
    }
}

export default notificationReducer