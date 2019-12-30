import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    //const anecdotesList = props.store.getState().anecdote

    const voteAndNotify = (id, content) => {
        props.store.dispatch(setMessage(`you voted ${content}`))
        props.store.dispatch(vote(id))
        setTimeout(() => {
            props.store.dispatch(setMessage(null))
        }, 5000)
    }
    const { anecdote, filter } = props.store.getState()
    let afterFilter
    if (!filter) {
        afterFilter = anecdote
    } else {
        afterFilter = anecdote.filter(a => a.content.includes(filter))
    }


    console.log("CHECK:", afterFilter, anecdote)
    console.log("STATE", props.store.getState())
    return (
        <div>
            {afterFilter.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div> has {anecdote.votes}
                        <button onClick={() => voteAndNotify(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList