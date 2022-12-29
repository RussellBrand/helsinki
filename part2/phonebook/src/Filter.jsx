const Filter = (prop) => {
  const { filterString, handleFilterChange } = prop;
  return (
    <div>
      Filter shown names staring with
      <input value={filterString} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
