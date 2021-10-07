import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotifications } from '../reducers/notificationReducer'

const initialState = null

export const loginAction = (credentials) => dispatch => {
    loginService.login(credentials)
        .then(user => {
            dispatch({
                type: 'LOGIN',
                user
            })
            dispatch(setNotifications(`User logged in`, 5000, 'success'))
        })
        .catch(err => {
            dispatch(setNotifications(`Wrong username or password`, 5000, 'error'))
        })
}

export const logoutAction = () => {
    return {
        type: 'LOGOUT'
    }
}

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        user
    }
}


const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('user', JSON.stringify(action.user))
            blogService.setToken(action.user.token)
            return action.user;
        case 'LOGOUT':
            console.log(`user logged out`)
            localStorage.clear()
            return initialState
        case 'SET_USER':
            if (action.user) {
                return action.user
            } else {
                return null
            }
        default:
            return state;
    }
}

export default loginReducer