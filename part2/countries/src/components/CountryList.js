import React from "react";

const Country = ({ searchCountries }) => {
  const countryRow = country => {
    return (
      <div key={country.numericCode}>
        <h3>{country.name}</h3>
      </div>
    );
  };

  return searchCountries.length > 10 ? (
    <p>Too many matches, specify another filter</p>
  ) : (
    searchCountries.map(country => countryRow(country))
  );
};

export default Country;
