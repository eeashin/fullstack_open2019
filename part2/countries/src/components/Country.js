import React from "react";

const Country = ({ searchCountries }) =>
  searchCountries.map(country => (
    <div key={country.numericCode}>
      <div>
        <h2>{country.name} </h2>
      </div>
      <div>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
      </div>
      <div>
        <h3>languages</h3>{" "}
        <ul>
          {country.languages.map(language => (
            <li key={language.nativeName}>{language.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <img
          src={country.flag}
          alt="flag"
          style={{ height: "120px", width: "120px" }}
        />
      </div>
    </div>
  ));
export default Country;
