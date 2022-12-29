import { useState } from "react";
import Filter from "./Filter.jsx";
import AddPerson from "./AddPerson.jsx";
import Numbers from "./Numbers.jsx";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

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

      <Filter
        filterString={filterString}
        handleFilterChange={handleFilterChange}
      />

      <AddPerson
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      {/* 
      <h2>debugging</h2>
      <pre>filterString={JSON.stringify(filterString)}</pre>
      <pre>newName={JSON.stringify(newName)}</pre>
      <pre>newNumber={JSON.stringify(newNumber)}</pre>
      <pre>persons={JSON.stringify(persons, null, 4)}</pre>
*/}

      <Numbers persons={persons} filterString={filterString} />
    </div>
  );
};

export default App;
