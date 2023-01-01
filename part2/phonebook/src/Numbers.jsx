import Persons from "./services/persons.js";

const Numbers = (props) => {
  const { persons, filterString, localDelete } = props;

  return (
    <div>
      {persons
        .filter(({ name }) =>
          name.toLowerCase().startsWith(filterString.trim().toLowerCase())
        )
        .map((person) => {
          const { name } = person;
          return (
            <APerson key={name} localDelete={localDelete} person={person} />
          );
        })}
    </div>
  );
};

export default Numbers;

const APerson = (props) => {
  const { person, localDelete } = props;
  const { id, number, name } = person;

  const personDeleteClick = () => {
    if (!window.confirm(`Confirm deletion on ${number}`)) {
      return;
    }

    Persons.remove(id)
      .then((x) => {
        localDelete(id);
      })
      .catch((error) => {
        alert(`failed to delete ${id} -- ${error}`);
      });
  };

  return (
    <div key={id}>
      {name} -- {number} <button onClick={personDeleteClick}>Delete</button>{" "}
      <br /> <br />
    </div>
  );
};
