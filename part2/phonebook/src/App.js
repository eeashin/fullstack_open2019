import React, { useState } from 'react'
import Person from './components/Person'

const App = (props) => {
  const [persons, setPersons] = useState([
    //{ name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: persons.length + 1,
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const nameRows = () => persons.map((person) =>
    <Person key={person.id}
      person={person}
    />

  )
  console.log(persons)

  return (
    <div>
      <h2>Phonebook</h2>


      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {nameRows()}
      </div>
      ...
      <div>debug: {newName}</div>
    </div>
  )
}

export default App
