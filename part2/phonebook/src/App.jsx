import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./Filter.jsx";
import AddPerson from "./AddPerson.jsx";
import Numbers from "./Numbers.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        console.log("promise fulfilled");
        setPersons(response.data);
      })
      .catch((error) => {
        console.log(`Effect Problem{error}`);
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
    let trimName = newName.trim();
    if (trimName === "") {
      alert(`name cannot be blank`);
    } else if (persons.find(({ name }) => name === trimName)) {
      alert(`{name} is already in the phone book`);
      return;
    } else {
      setPersons((pp) => [{ name: trimName, number: newNumber.trim() }, ...pp]);
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

      <Numbers persons={persons} filterString={filterString} />
    </div>
  );
};

export default App;
