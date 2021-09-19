import React, { useState } from "react";
import "./Climate.css";

const Climate = ({
  countries,
  setCountries,
  climateCountries,
  setClimateCountries,
}) => {
  const [climate, setClimate] = useState();

  const getCountries = async () => {
    const url = "http://localhost:3000/getCountriesBasedOnClimate";
    const param = { val: climate };
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    });
    const data = await response.json();
    return data
  };
  
  const listCountries = (data) => {
    for (let i = 0; i < data.length; i++) {
      setCountries(countries.push([data[i].name, data[i].countrycode]));
    }
    return countries
  }

  const listClimateCountries = (data) => {
    for (let i = 0; i < data.length; i++) {
      setClimateCountries(climateCountries.push([data[i].name, data[i].countrycode]));
    }
    return climateCountries
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (countries.length !== 0) {
      setCountries(countries.splice(0));
      setClimateCountries(climateCountries.splice(0));
    }

    const data = await getCountries()
    setCountries(await listCountries(data))
    setClimateCountries(await listClimateCountries(data))
  };

  const handleChange = (e) => {
    setClimate(e.target.value);
  };

  return (
    <div className="climate-container">
      <div>
        <h2 className="climate-title">Climate</h2>
        <p className="climate-subtitle">
          Select your favorite climate from the options below to get the corresponding country.
        </p>
      </div>
      <div className="climate-body">
        <form onSubmit={handleSubmit}>
          <select
            name="climate"
            onChange={handleChange}
            className="climate-select"
          >
            <option disabled selected value>Select</option>
            <option value="tropical">Tropical</option>
            <option value="dry">Dry</option>
            <option value="temperate">Temperate</option>
            <option value="continental">Continental</option>
            <option value="polar">Polar</option>
          </select>
          <input
            type="submit"
            value="Save"
            className="climate-btn-submit"
          ></input>
        </form>
      </div>
    </div>
  );
};

export default Climate;
