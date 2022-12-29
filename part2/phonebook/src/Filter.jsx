const Filter = (prop) => {
  const { filterString, handleFilterChange } = prop;
  return (
    <div>
      <h2>Filtering</h2>
      Filter shown names staring with
      <input value={filterString} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
