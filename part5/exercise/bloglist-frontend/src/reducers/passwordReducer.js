export const setPasswordAction = (pass) => {
    return{
        type: 'PASSWORD_SET',
        pass
    }
}

const passwordReducer = (state = '', action) => {
    switch (action.type) {
        case 'PASSWORD_SET':
            return action.pass
        default:
            return state;
    }

}


export default passwordReducer