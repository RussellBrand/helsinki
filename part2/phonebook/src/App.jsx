import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./Filter.jsx";
import AddPerson from "./AddPerson.jsx";
import Numbers from "./Numbers.jsx";
import Persons from "./services/persons.js";

import AlertBox from "./AlertBox.jsx";

const ALERT_TIME = 2000;

const App = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertKind, setAlertKind] = useState("success");
  const [persons, setPersons] = useState([]);

  function specifyAlert(message, kind) {
    console.log("specifyAlert", message, kind);
    setAlertMessage(message);
    setAlertKind(kind);
    setTimeout(() => {
      setAlertMessage("");
    }, ALERT_TIME);
  }

  function announceError(message) {
    specifyAlert(message, "error");
  }

  function announceSuccess(message) {
    specifyAlert(message, "success");
  }

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
        Persons.update(collisionPerson.id, {
          ...collisionPerson,
          number: newNumber,
        })
          .then((response) => {
            // console.log({ collisionResponse: response });
            setPersons((pp) =>
              persons.map((pp) =>
                pp.id === collisionPerson.id ? response : pp
              )
            );
            announceSuccess(
              `${collisionPerson.name}(${collisionPerson.id}) updated`
            );
          })
          .catch((error) => {
            console.log(`failed to update ${trimName}`, error);
            announceError(`failed to update ${trimName}`);
          });
      } // FOUND PERSON
    } else {
      const newPerson = { name: trimName, number: newNumber.trim() };
      Persons.create(newPerson)
        .then((response) => {
          // console.log({ response });
          setPersons((pp) => [response, ...pp]);
          announceSuccess(`${response.name}(${response.id}) created`);
        })
        .catch((error) => {
          console.log({ error, newPerson });
          announceError(`failed to add ${newPerson}`);
        });
    }
    setNewName("");
    setNewNumber("");
  };
  return (
    <div>
      <h1>Phonebook</h1>

      <AlertBox
        alertMessage={alertMessage}
        alertKind={alertKind}
        setAlertMessage={setAlertMessage}
      />

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
        announceError={announceError}
        announceSuccess={announceSuccess}
        persons={persons}
        filterString={filterString}
      />
    </div>
  );
};

export default App;
