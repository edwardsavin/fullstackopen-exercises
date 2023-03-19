import Person from "./Person";

const Persons = ({ filteredNames }) => {
  return (
    <ul>
      {filteredNames.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          phoneNumber={person.phoneNumber}
        />
      ))}
    </ul>
  );
};

export default Persons;
