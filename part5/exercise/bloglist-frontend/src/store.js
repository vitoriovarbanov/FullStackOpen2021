import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk'
//REDUCERS
import usernameReducer from './reducers/usernameReducer'
import loginReducer from './reducers/loginReducer'
import passwordReducer from './reducers/passwordReducer'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer';

const reducer = combineReducers({
  username: usernameReducer,
  password: passwordReducer,
  loggedUser: loginReducer,
  notifications: notificationReducer,
  allBlogs: blogsReducer
}
)

const middleWare = applyMiddleware(promise,thunk)

const store = createStore(
  reducer,
  composeWithDevTools(middleWare)
);

export default store 