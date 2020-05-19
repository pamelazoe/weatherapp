import React, { useState } from "react";
import Error from "./Error";

const Form = ({ search, setSearch, setConsult }) => {
  const [error, setError] = useState(false);
  // extract city and country
  const { city, country } = search;

  // function that adds elements to state
  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const searchWeather = (e) => {
    e.preventDefault();

    if (city.trim() === "" || country.trim() === "") {
      setError(true);
      return;
    }
    setError(false);
    setConsult(true);
  };
  // console.log(searh)
  return (
    <form onSubmit={searchWeather}>
      {error ? <Error message="Both inputs are mandatory" /> : null}
      <div className="input-field">
        <input
          type="text"
          name="city"
          id="city"
          value={city}
          onChange={handleChange}
        />
        <label htmlFor="city">City: </label>
      </div>
      <div className="select-country">
        <select
          onChange={handleChange}
          name="country"
          id="country"
          value={country}
        >
          <option value="">Select a country</option>
          <option value="US">United States</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
          <option value="CA">Canadá</option>
          <option value="JP">Japan</option>
          <option value="FR">France</option>
        </select>
        <input type="submit" value="Search Climate" />
      </div>
    </form>
  );
};

export default Form;
