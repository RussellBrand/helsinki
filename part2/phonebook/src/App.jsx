import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./Filter.jsx";
import AddPerson from "./AddPerson.jsx";
import Numbers from "./Numbers.jsx";

import Persons from "./services/persons.js";

const App = () => {
  const [persons, setPersons] = useState([]);

  const localDelete = (theId) => {
    setPersons((p) => p.filter(({ id }) => theId !== id));
  };

  useEffect(() => {
    console.log("effect");
    Persons.getAll()
      .then((response) => {
        console.log("PERSONS promise fulfilled");
        setPersons(response);
      })
      .catch((error) => {
        console.log(`PERSONS Effect Problem ${error}`);
      });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [filterString, setFilterString] = useState("");

  const handleFilterChange = (event) => {
    setFilterString(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const trimName = newName.trim();
    const collisionPerson = persons.find(({ name }) => name === trimName);

    if (trimName === "") {
      alert(`name cannot be blank`);
    } else if (collisionPerson) {
      if (!window.confirm(`${trimName} already in phonebook -- Update? `)) {
        return;
      } else {
        const newPerson = 100;
        Persons.update(collisionPerson.id, {
          ...collisionPerson,
          number: newNumber,
        })
          .then((response) => {
            // console.log({ collisionResponse: response });
            setPersons((pp) => {
              return persons.map((pp) =>
                pp.id === collisionPerson.id ? response : pp
              );
            });
          })
          .catch((error) => {
            console.log({ error, newPerson });
            alert(`failed to add ${newPerson}`);
          });
      } // FOUND PERSON
    } else {
      const newPerson = { name: trimName, number: newNumber.trim() };
      Persons.create(newPerson)
        .then((response) => {
          // console.log({ response });
          setPersons((pp) => [response, ...pp]);
        })
        .catch((error) => {
          console.log({ error, newPerson });
          alert(`failed to add ${newPerson}`);
        });
      setNewName("");
      setNewNumber("");
    }
  };
  return (
    <div>
      <h1>Phonebook</h1>

      <h2>Filtering</h2>

      <Filter
        filterString={filterString}
        handleFilterChange={handleFilterChange}
      />

      <h2>Add person</h2>

      <AddPerson
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>

      <Numbers
        localDelete={localDelete}
        persons={persons}
        filterString={filterString}
      />
    </div>
  );
};

export default App;
