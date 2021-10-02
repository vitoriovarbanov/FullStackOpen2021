import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import noteReducer from './noteReducer'
import filterReducer from './reducers/filterReducer'
import App from './App'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(reducer,composeWithDevTools())

console.log(store.getState())

ReactDOM.render(
   <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'))