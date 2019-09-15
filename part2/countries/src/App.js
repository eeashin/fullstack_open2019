import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryList from "./components/CountryList";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchCountries, setSearchCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  const handleSearchCountries = event => {
    setSearchValue(event.target.value);
    const searchCountry = countries.filter(country =>
      country.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchCountries(searchCountry);
  };

  console.log(countries);
  console.log(searchCountries);

  const countryInfo = () =>
    searchCountries.length === 1 ? (
      <Country searchCountries={searchCountries} />
    ) : (
      <CountryList searchCountries={searchCountries} />
    );

  return (
    <div>
      <div>
        find countries
        <input value={searchValue} onChange={handleSearchCountries} />
      </div>
      {countryInfo()}
    </div>
  );
};

export default App;
