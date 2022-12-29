// steps
// [ ] control the text area
// [ ] make the submit but not refresh the page
// [ ] make the submit add
// [ ] make the submit clear

import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>

        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>

        <div>
          <button type="submit" disabled={newName.trim() === ""}>
            add
          </button>
        </div>
      </form>
      <h2>debugging</h2>
      <pre>newName={JSON.stringify(newName)}</pre>
      <pre>newNumber={JSON.stringify(newNumber)}</pre>
      <pre>persons={JSON.stringify(persons, null, 4)}</pre>

      <h2>Numbers</h2>
      {persons.map(({ name, number }) => {
        return (
          <div key={name}>
            {name} -- {number}{" "}
          </div>
        );
      })}
    </div>
  );
};

export default App;
