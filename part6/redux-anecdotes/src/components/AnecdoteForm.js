import React from 'react'
import { addNew } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const addAndNotify = (event) => {
        event.preventDefault()
        props.store.dispatch(setMessage(`you created ${event.target.newData.value}`))
        props.store.dispatch(addNew(event.target.newData.value))
        setTimeout(() => {
            props.store.dispatch(setMessage(null))
        }, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={(event) => { addAndNotify(event) }}>
                <input name='newData'></input>
                <button>create</button>
            </form>

        </div>
    )
}

export default AnecdoteForm