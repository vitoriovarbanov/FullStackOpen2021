const notificationReducer = (state = '', action) => {
    switch(action.type){
        case 'NEW_NOTIFICATION':
            return action.message
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


export default notificationReducer