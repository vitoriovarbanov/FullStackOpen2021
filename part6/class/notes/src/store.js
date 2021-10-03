import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//REDUCERS
import noteReducer from './noteReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
    notes: noteReducer,
    filter: filterReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
console.log(store.getState())

export default store