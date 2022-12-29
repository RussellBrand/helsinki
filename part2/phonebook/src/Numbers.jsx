const Numbers = (props) => {
  const { persons, filterString } = props;
  return (
    <div>
      <h2>Numbers</h2>
      {persons
        .filter(({ name }) =>
          name.toLowerCase().startsWith(filterString.trim().toLowerCase())
        )
        .map(({ name, number }) => {
          return (
            <div key={name}>
              {name} -- {number}{" "}
            </div>
          );
        })}
    </div>
  );
};

export default Numbers;
