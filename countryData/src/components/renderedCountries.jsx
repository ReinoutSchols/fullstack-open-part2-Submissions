import React from 'react';
import Weather from '../Weather';

const RenderedCountries = ({countriesToShow, selectedCountry, handleShowClick}) => {
  const tooManyMatches = countriesToShow.length > 10;
  const apiKey = import.meta.env.VITE_SOME_KEY
  if (tooManyMatches) {
    return <p>Too many matches, specify another filter</p>;
  } 
  if (countriesToShow.length === 1 || selectedCountry) {
    const country = selectedCountry || countriesToShow[0];
    const languagesList = Object.values(country.languages).map((language, index) => ( // nice way to get the values of array
      <li key={index}>{language}</li>
    ));
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}</p>
        <h2>Languages </h2>
        <ul>{languagesList}</ul>
        <img src={country.flags.png} alt="Flag of country" />
        {(selectedCountry || countriesToShow.length === 1) && (
          <Weather apiKey= {apiKey} location={country.latlng} country={country.name.common} />
        )}
      </div>
    );
  }  return (
    <>
      {countriesToShow.map((country) => (
        <div key={country.name.common}>
          {country.name.common}
          <button 
            onClick={() => handleShowClick(country)}
          >
            Show
          </button>
        </div>
      ))}
    </>
  );
};

export default RenderedCountries;