import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, handleUsernameChange, handlePasswordChange, username, password }) => {
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
                    Username:
          <input type='text' value={username} name="username" onChange={handleUsernameChange} />
        </div>
        <div>
                    Password:
          <input type="password" value={password} name="password" onChange={handlePasswordChange} />
        </div>
        <button type="submit">
                    Login
        </button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm