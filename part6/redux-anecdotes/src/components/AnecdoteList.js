import React from 'react'
import { connect } from 'react-redux'
import { voteA } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    //const anecdotesList = props.store.getState().anecdote

    const voteAndNotify = (anecdote) => {
        props.voteA(anecdote)
        props.setMessage(`you voted ${anecdote.content}`)
        setTimeout(() => {
            props.setMessage(null)
        }, 5000)
    }
   
    return (
        <div>
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
        return state.anecdote.sort((a, b) => b.votes - a.votes)
    } else {
        return state.anecdote.filter(a => a.content.includes(filter)).sort((a, b) => b.votes - a.votes)
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