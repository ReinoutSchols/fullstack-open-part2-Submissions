import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import countryResources from './countryResources';
import RenderedCountries from './components/renderedCountries';


const App = () => {

  const [countries, setCountries] = useState([]);
  const [showCountry, setShowCountry] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countryResources
    .getAll()
    .then(allCountries => {
      console.log(countries)
      setCountries(allCountries)
      setSelectedCountry(null)
    });
    // used the side effect to make it fetch the data and change the state each time the search input changes.
    // (otherwise the state was stuck after pressing the show button)
}, [showCountry]);

  // filtering the countries bases on if text is inputted in the search bar with .filter.
  const countriesToShow = showCountry
  ? countries.filter(country => country.name.common.toLowerCase().includes(showCountry.toLowerCase()))
  : countries;

  const handleSearchChange = (event) => {
    //console.log(event.target.value)
    setShowCountry(event.target.value);
  };

  const handleShowClick = (country) => {
    console.log('clicked!')
    setSelectedCountry(country)
  }

  //Passing props to children components
  return (
    <div>
      <Filter 
          handleSearchChange={handleSearchChange}
          showCountry={showCountry}
        /> 
      <RenderedCountries
        countriesToShow={countriesToShow}
        selectedCountry={selectedCountry}     
        handleShowClick={handleShowClick}  
      />
    </div>
  )
}

export default App;