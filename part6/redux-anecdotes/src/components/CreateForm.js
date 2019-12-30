import React from 'react'
import { addNew } from '../reducers/anecdoteReducer'

const CreateForm = (props) => (
    <div>
        <h2>create new</h2>
        <form onSubmit={(event) => {
            event.preventDefault();
            props.store.dispatch(addNew(event.target.newData.value))
        }}>
            <div><input name="newData" /></div>
            <button>create</button>
        </form>
    </div>
)

export default CreateForm 