const Numbers = (props) => {
  const { persons, filterString } = props;
  return (
    <div>
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
