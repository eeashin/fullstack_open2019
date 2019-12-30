import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const anecdotes = props.store.getState().anecdote

    const voteAndNotify = (id, content) => {
        props.store.dispatch(setMessage(`you voted ${content}`))
        props.store.dispatch(vote(id))
        setTimeout(() => {
            props.store.dispatch(setMessage(null))
          }, 5000)
    }

    //console.log("STATE", props.store.getState())
    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div> has {anecdote.votes}
                        <button onClick={()=> voteAndNotify(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList