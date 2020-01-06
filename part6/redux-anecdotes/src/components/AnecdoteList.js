import React from 'react'
import { connect } from 'react-redux'
import { voteA } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    //const anecdotesList = props.store.getState().anecdote

    const voteAndNotify = (id, content) => {
        props.setMessage(`you voted ${content}`)
        props.voteA(id)
        setTimeout(() => {
            props.setMessage(null)
        }, 5000)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {props.visibleAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div> has {anecdote.votes}
                        <button onClick={(event) => {
                            event.preventDefault();
                        voteAndNotify(anecdote.id, anecdote.content)}
                        }>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const anecdotesToShow = (state) => {
    let filter = state.filter
    if (!filter) {
        return state.anecdotes.sort((a, b) => b.votes - a.votes)
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
        filter: state.filter
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)