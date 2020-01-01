import React from 'react'
import { connect } from 'react-redux'
import { voteA } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {

    //const anecdotesList = props.store.getState().anecdote

    const voteAndNotify = (id, content) => {
        props.store.dispatch(setMessage(`you voted ${content}`))
        props.store.dispatch(voteA(id))
        setTimeout(() => {
            props.store.dispatch(setMessage(null))
        }, 5000)
    }
   
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

let afterFilter = ({ anecdote, filter }) => {
//let afterFilter
if (!filter) {
    afterFilter = anecdote
} else {
    afterFilter = anecdote.filter(a => a.content.includes(filter))
}
}




const mapDispatchToProps = {
    voteA,
    setMessage
}

const mapStateToProps = (state) => {
    return {
        afterFilter: afterFilter(state),
        filter: state.filter
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)