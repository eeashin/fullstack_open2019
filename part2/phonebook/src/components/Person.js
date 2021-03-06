import React from "react";

const Person = ({ persons, searchValue, deletePersonById }) => {
  const personRow = person => {
    return (
      <div key={person.id}>
        <p>
          {person.name} {person.number}
          <button onClick={() => deletePersonById(person)}>delete</button>
        </p>
      </div>
    );
  };
  const searchPerson = persons.filter(person =>
    person.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return searchValue === ""
    ? persons.map(person => personRow(person))
    : searchPerson.map(person => personRow(person));
};

export default Person;
