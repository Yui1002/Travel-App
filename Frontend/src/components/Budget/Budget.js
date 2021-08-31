import React, { useState } from "react";
import Countries from "../Budget/Countries";
import "./Budget.css";

const Budget = ({ countries, setCountries }) => {
  const [costs, setCosts] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`submitted ${costs}`);

    if(countries.length !== 0) {
      setCountries(countries.splice(0))
    }

    setCountries(await getCountries());
  };

  const getCountries = async () => {
    const url = "http://localhost:3000/getCountriesBasedOnBudget";
    const param = { val: costs };

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

  const handleChange = (e) => {
    setCosts(e.target.value);
  };

  return (
    <div className="budget-container">
      <div className="budget-title">
        <h2 budget-title-subtitle>Budget</h2>
        <p className="budget-title-subtitle">
          Get the list of countries by budget. This is based on the cost of
          living index
        </p>
      </div>
      <div className="budget-body">
        <form onSubmit={handleSubmit}>
          <select onChange={handleChange} className="budget-select">
            <option value="select">Select</option>
            <option value="expensive">Expensive</option>
            <option value="middle">Middle</option>
            <option value="cheap">Cheap</option>
          </select>
          <input
            type="submit"
            value="Submit"
            className="budget-btn-submit"
          ></input>
        </form>
      </div>
    </div>
  );
};

export default Budget;
