import Person from "./Person";

const Persons = ({ filteredNames, handleDeletePerson }) => {
  return (
    <ul>
      {filteredNames.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          phoneNumber={person.phoneNumber}
          toggleDelete={() => handleDeletePerson(person.id)}
        />
      ))}
    </ul>
  );
};

export default Persons;
