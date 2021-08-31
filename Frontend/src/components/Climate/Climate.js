import React, { useState } from "react";
import Countries from "./Countries";
import "./Climate.css";

const Climate = ({ countries, setCountries }) => {
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

    for (let i = 0; i < data.length; i++) {
      setCountries(countries.push([data[i].name, data[i].countrycode]));
    }

    return countries;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`submitted: ${climate}`);

    if(countries.length !== 0) {
      setCountries(countries.splice(0))
    }

    setCountries(await getCountries());
  };

  const handleChange = (e) => {
    setClimate(e.target.value);
  };

  return (
    <div className="climate-container">
      <div className="climate-title">
        <h2>Climate</h2>
        <p className="climate-title-subtitle">
          Get the list of countries by climate
        </p>
      </div>
      <div className="climate-body">
        <form onSubmit={handleSubmit}>
          <select
            name="climate"
            onChange={handleChange}
            className="distance-select"
          >
            <option value="select">Select</option>
            <option value="tropical">Tropical</option>
            <option value="dry">Dry</option>
            <option value="temperate">Temperate</option>
            <option value="continental">Continental</option>
            <option value="polar">Polar</option>
          </select>
          <input
            type="submit"
            value="Submit"
            className="climate-btn-submit"
          ></input>
        </form>
      </div>
    </div>
  );
};

export default Climate;
