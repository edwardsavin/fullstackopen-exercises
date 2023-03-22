const Person = ({ name, phoneNumber, toggleDelete }) => (
  <li>
    {name} {phoneNumber}
    <button onClick={toggleDelete}>delete</button>
  </li>
);

export default Person;
