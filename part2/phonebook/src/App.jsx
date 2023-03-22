import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/AllPersons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState("");

  useEffect(() => {
    personService.getAll().then((initialNames) => setPersons(initialNames));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
      return;
    }

    const personObject = {
      name: newName,
      phoneNumber: newNumber,
      id: persons.length + 1,
    };

    personService.create(personObject).then((returnedName) => {
      setPersons(persons.concat(returnedName));
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
