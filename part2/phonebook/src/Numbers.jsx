import Persons from "./services/persons.js";

const Numbers = (props) => {
  const { persons, filterString, localDelete, announceError, announceSuccess } =
    props;

  // console.log({ NumbersPersons: persons });

  return (
    <div>
      {persons
        .filter((thisPerson) => {
          const { name } = thisPerson;
          // console.log({ thisPerson, filterString });
          return name
            .toLowerCase()
            .startsWith(filterString.trim().toLowerCase());
        })
        .map((person) => {
          const { name } = person;
          return (
            <APerson
              key={name}
              localDelete={localDelete}
              announceError={announceError}
              announceSuccess={announceSuccess}
              person={person}
            />
          );
        })}
    </div>
  );
};

export default Numbers;

const APerson = (props) => {
  const { person, localDelete, announceError, announceSuccess } = props;
  const { id, number, name } = person;

  const personDeleteClick = () => {
    if (!window.confirm(`Confirm deletion on ${number}`)) {
      return;
    }

    Persons.remove(id)
      .then((x) => {
        localDelete(id);
        announceSuccess(`Deleted ${name} (${id})`);
      })
      .catch((error) => {
        announceError(`failed to delete ${name} (${id})`);
        console.log(`failed to delete ${name} (${id})`, error);
      });
  };

  return (
    <div key={id}>
      {name} -- {number} <button onClick={personDeleteClick}>Delete</button>{" "}
      <br /> <br />
    </div>
  );
};
