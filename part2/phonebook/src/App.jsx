import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/AllPersons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("default");

  useEffect(() => {
    personService.getAll().then((initialNames) => setPersons(initialNames));
  }, []);

  const personObject = {
    name: newName,
    phoneNumber: newNumber,
    id: persons.length + 1,
  };

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find((p) => p.name === newName);

    if (person) {
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (result) {
        personService
          .update(person.id, personObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : returnedPerson))
            );
            setNewName("");
            setNewNumber("");
          })
          .catch(() => {
            setNotificationMessage(
              `Information of ${person.name} has already been removed from server`
            );
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
            setNotificationType("error");

            setPersons(persons.filter((p) => p.id !== person.id));
          });

        return;
      }

      return;
    }

    personService.create(personObject).then((returnedName) => {
      setPersons(persons.concat(returnedName));

      setNotificationMessage(`Added ${returnedName.name}`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
      setNotificationType("info");

      setNewName("");
      setNewNumber("");
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFiltered(event.target.value);
  };

  const filteredNames = persons.filter((person) => {
    return person.name.toLowerCase().includes(filtered.toLowerCase());
  });

  const handleDeletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    const result = window.confirm(`Delete ${person.name}?`);

    if (result) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage}
        notificationType={notificationType}
      />
      <Filter value={filtered} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        filteredNames={filteredNames}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
