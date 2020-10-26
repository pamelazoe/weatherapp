import React, { useState } from 'react';
import Error from './Error';

const Form = ({ search, setSearch, setConsult }) => {
  const [error, setError] = useState(false);
  // extract city and country
  const { city, country, fullCountry } = search;

  // function that adds elements to state
  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
    // setSearch({
    //   ...search,
    //   fullCountry: e.target.getAttribute('data-country'),
    // });
  };

  const handleCountry = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
      fullCountry: e.target[e.target.selectedIndex].getAttribute(
        'data-country'
      ),
    });
    // setSearch({
    //   ...search,
    //   fullCountry: e.target[e.target.selectedIndex].getAttribute(
    //     'data-country'
    //   ),
    // });
  };

  const searchWeather = (e) => {
    e.preventDefault();
    console.log(search);

    if (
      city.trim() === '' ||
      country.trim() === '' ||
      fullCountry.trim() === ''
    ) {
      setError(true);
      return;
    }
    setError(false);
    setConsult(true);
  };
  // console.log(searh)
  return (
    <form onSubmit={searchWeather}>
      {error ? <Error message='Both inputs are mandatory' /> : null}
      <div className='input-field'>
        <label htmlFor='city'>City: </label>
        <input
          type='text'
          name='city'
          id='city'
          value={city}
          onChange={handleChange}
        />
      </div>
      <div className='select-country'>
        <select
          onChange={handleCountry}
          name='country'
          id='country'
          value={country}
        >
          <option value=''>Select a country</option>
          <option value='US' data-country='United States'>
            United States
          </option>
          <option value='MX' data-country='Mexico'>
            México
          </option>
          <option value='AR' data-country='Argentina'>
            Argentina
          </option>
          <option value='CO' data-country='Colombia'>
            Colombia
          </option>
          <option value='CR' data-country='Costa Rica'>
            Costa Rica
          </option>
          <option value='ES' data-country='Spain'>
            España
          </option>
          <option value='PE' data-country='Peru'>
            Perú
          </option>
          <option value='CA' data-country='Canada'>
            Canadá
          </option>
          <option value='JP' data-country='Japan'>
            Japan
          </option>
          <option value='FR' data-country='France'>
            France
          </option>
        </select>
        <input type='submit' value='Search Climate' />
      </div>
    </form>
  );
};

export default Form;
