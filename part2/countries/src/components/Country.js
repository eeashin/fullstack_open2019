import React from "react";
import Weather from "./Weather";

const Country = ({ searchCountries, weather, setWeather }) =>
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
      <div>
        <Weather
          setWeather={setWeather}
          capital={country.capital}
          weather={weather}
        />
      </div>
    </div>
  ));
export default Country;
