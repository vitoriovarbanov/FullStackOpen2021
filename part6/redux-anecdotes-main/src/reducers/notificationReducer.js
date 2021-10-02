const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return action.message
        case 'REMOVE_NOTIFICATION':
            return ''
        default:
            return state;
    }
}

export const createNotification = (message) => {
    return {
        type: 'NEW_NOTIFICATION',
        message
    }
}

export const removeNotification = () => {
    return{
        type: 'REMOVE_NOTIFICATION'
    }
}


export default notificationReducer