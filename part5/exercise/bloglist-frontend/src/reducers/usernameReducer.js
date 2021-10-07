export const setStoreUsername = (username) => {
    return {
        type: 'USERNAME_SET',
        username
    }
}

const usernameReducer = (state = '', action) => {
    switch (action.type) {
        case 'USERNAME_SET':
            return action.username
        default:
            return state;
    }
}

export default usernameReducer