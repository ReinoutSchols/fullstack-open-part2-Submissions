import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ apiKey, location, country}) => {
  const [weatherData, setWeatherData] = useState(null);
  console.log(location)
  console.log(weatherData);

  const convertTemp = (kelvin) => {
    return kelvin - 273.15;
  };

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&appid=${apiKey}`)
        .then((response) => {
          setWeatherData(response.data)
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error)
        })
    }
    fetchData()
  }, [apiKey, location]);

  return (
    <div>
      <h2>Weather in {country}</h2>
      {weatherData && (
        <div>
          <p>temperature {convertTemp(weatherData.main.temp).toFixed(2)} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="weather description"
          />
          <p>wind {weatherData.wind.speed}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;