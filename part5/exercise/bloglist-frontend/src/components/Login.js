/* import { setStoreUsername } from './reducers/usernameReducer'
import { setPasswordAction } from './reducers/passwordReducer'
import { loginAction, logoutAction } from './reducers/loginReducer'

const handleLogin = async (e) => {
    const username = useSelector(state => state.username)
    const password = useSelector(state => state.password)
    e.preventDefault()
    const credentials = {
        username,
        password
    }
    try {
        dispatch(loginAction(credentials))
        dispatch(setStoreUsername(''))
        dispatch(setPasswordAction(''))
        console.log(`User logging in`, loggedUser)
        setSuccessMsg(`User logged in - ${loggedUser.username}`)
        setTimeout(() => {
          setSuccessMsg('')
        }, 4000) 
    } catch (err) {
        setErrorMsg('Wrong username or password!')
        setTimeout(() => {
            setErrorMsg('')
        }, 4000)
    }
}

const onLogoutClick = () => {
    dispatch(logoutAction())
}

const handleUsernameSet = (e) => {
    e.preventDefault()
    dispatch(setStoreUsername(e.target.value))
}

const handlePasswordSet = (e) => {
    e.preventDefault()
    dispatch(setPasswordAction(e.target.value))
}

const renderLoginForm = () => {
    return (
        <form onSubmit={handleLogin}>
            <div>
                Username: <input onChange={(handleUsernameSet)} />
            </div>
            <div>
                Password: <input type='password' onChange={handlePasswordSet} />
            </div>
            <button type='submit'>Login</button>
        </form>
    )
} */