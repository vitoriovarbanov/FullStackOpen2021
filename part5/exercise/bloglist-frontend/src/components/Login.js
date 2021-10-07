import { useDispatch, useSelector } from 'react-redux'

import { setStoreUsername } from '../reducers/usernameReducer'
import { setPasswordAction } from '../reducers/passwordReducer'
import { loginAction } from '../reducers/loginReducer'

const RenderLoginForm = () => {
    const dispatch = useDispatch()
    const username = useSelector(state => state.username)
    const password = useSelector(state => state.password)
    const user = useSelector(state => state.loggedUser)

    const handleLogin = async (e) => {
        e.preventDefault()
        const credentials = {
            username,
            password
        }
        dispatch(loginAction(credentials))
        dispatch(setStoreUsername(''))
        dispatch(setPasswordAction(''))

    }

    const handleUsernameSet = (e) => {
        e.preventDefault()
        dispatch(setStoreUsername(e.target.value))
    }

    const handlePasswordSet = (e) => {
        e.preventDefault()
        dispatch(setPasswordAction(e.target.value))
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    Username: <input onChange={(handleUsernameSet)} />
                </div>
                <div>
                    Password: <input type='password' onChange={handlePasswordSet} />
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default RenderLoginForm