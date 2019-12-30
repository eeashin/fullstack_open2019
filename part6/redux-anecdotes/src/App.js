import React from 'react';
import { voteById } from './reducers/anecdoteReducer'

const App = (props) => {
  const anecdotes = props.store.getState()

  // const vote = (id) => {
  //   console.log('vote', id)
  // }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => 
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => 
              props.store.dispatch(voteById(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App