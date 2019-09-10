import React from "react";

const Filter = ({ searchValue, handleSearchChange }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={searchValue} onChange={handleSearchChange} />
    </div>
  );
};

export default Filter;
