import React from 'react'
import { connect } from 'react-redux'
import { voteA } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const voteAndNotify = (anecdote) => {
        props.voteA(anecdote)
        props.setMessage(`you voted ${anecdote.content}`, 3000)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {props.visibleAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div> has {anecdote.votes}
                        <button onClick={() => voteAndNotify(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const anecdotesToShow = (state) => {
    let filter = state.filter
    if (!filter) {
        return state.anecdotes
    } else {
        return state.anecdotes.filter(a => a.content.includes(filter))
    }
}

const mapDispatchToProps = {
    voteA,
    setMessage
}

const mapStateToProps = (state) => {
    console.log('STATE IN MAP STATE:', state)
    return {
        visibleAnecdotes: anecdotesToShow(state),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)