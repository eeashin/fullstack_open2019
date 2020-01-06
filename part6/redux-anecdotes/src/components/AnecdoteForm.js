import React from 'react'
import { connect } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'
import anecdoteService from "../service/anecdotes";

const AnecdoteForm = (props) => {

    const addAndNotify = async (event) => {
        event.preventDefault()
        const content = event.target.data.value
        event.target.data.value = ''
        //const newAnecdote = await anecdoteService.createNew(content)
        props.addNew(content)
        props.setMessage(`you created ${content}`, 10)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAndNotify}>
                <input name='data'></input>
                <button type="submit">create</button>
            </form>

        </div>
    )
}

const mapDispatchToProps = {
  addNew,
  setMessage
}


export default connect(null,mapDispatchToProps)(AnecdoteForm)