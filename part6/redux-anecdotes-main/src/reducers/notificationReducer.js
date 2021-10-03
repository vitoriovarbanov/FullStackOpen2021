const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return action.message
        /* case 'REMOVE_NOTIFICATION':
            return '' */
        default:
            return state;
    }
}

export const createNotification = (message, notificationDuration) => {
    return async dispatch => {
        dispatch({
            type: 'NEW_NOTIFICATION',
            message
        })
        setTimeout(() => {
            dispatch({
                type: 'NEW_NOTIFICATION',
                message: ''
            })
        }, notificationDuration)
    }
}

/* export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
} */


export default notificationReducer