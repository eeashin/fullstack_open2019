import React from 'react'
import ReactDOM from 'react-dom'
//import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
// import anecdoteReducer, {initializeAnecdotes} from './reducers/anecdoteReducer'
// import notificationReducer from './reducers/notificationReducer'
// import filterReducer from './reducers/filterReducer'
// import anecdoteService from './service/anecdotes'
import store from './store'

// const reducer = combineReducers({
//   anecdote: anecdoteReducer,
//   notification: notificationReducer,
//   filter: filterReducer
// })

// const store = createStore(reducer)

// anecdoteService.getAll().then(anecdotes => 
//   store.dispatch(initializeAnecdotes(anecdotes))
//   )

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)