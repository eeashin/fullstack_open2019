import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [message, setMessage] = useState(null);
  const [errMessage, setErrMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then(initialPersons => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = event => {
    setNewName(event.target.value);
  };
  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };
  const handleSearchChange = event => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };
  const handleFormChange = event => {
    event.preventDefault();
    addName();
  };

  const addName = event => {
    const nameObject = {
      name: newName,
      number: newNumber
      //id: persons.length + 1
    };

    const checkedName =
      persons
        .map(({ name }) => name.toLowerCase())
        .indexOf(nameObject.name.toLowerCase()) > -1;
    console.log(checkedName);

    if (checkedName) {
      window.alert(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
    } else {
      personService.create(nameObject).then(returnedObject => {
        setPersons(persons.concat(returnedObject));
        setNewName("");
        setNewNumber(0);
        setMessage(`Added ${newName}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
  };

  const deletePersonById = person => {
    const { id } = person;
    window.confirm(`Delete ${person.name}?`);
    personService.deletePersonById(id).then(deletedObject => {
      setPersons(persons.filter(person => id !== person.id));
    }).catch(err =>{
      setErrMessage(
        `Information of ${person.name} has been removed from the server.`
      );
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    })
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errMessage={errMessage} />
      <Filter
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
      />
      <h3>add</h3>
      <PersonForm
        handleFormChange={handleFormChange}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>numbers</h2>
      <Person
        persons={persons}
        searchValue={searchValue}
        deletePersonById={deletePersonById}
      />
    </div>
  );
};

export default App;
