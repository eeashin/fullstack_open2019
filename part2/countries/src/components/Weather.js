import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ weather, setWeather, capital }) => {
  const apiKey = "3895d1605e2d95d508f4ac560d173ad8";
  let baseUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}`;
  const [image, setImage] = useState("");

  useEffect(() => {
    axios.get(baseUrl).then(response => {
      setWeather(response.data.current);
      setImage(response.data.current.weather_icons);
    });
  });

  return (
    <div>
      <div>
        {" "}
        <h3> Weather in {capital} </h3>
      </div>
      <p>
        <strong>temperature: </strong>
        {weather.temperature} Celcius{" "}
      </p>
      <div>
        <img src={image} alt="weather" />
      </div>
      <p>
        <strong>wind:{weather.wind_speed} </strong> kph{" "}
      </p>
      <h4>direction {weather.wind_dir}</h4>
    </div>
  );
};
export default Weather;
