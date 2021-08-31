import React, { useState } from "react";
import "./Activities.css";

const Activities = ({ countries, setCountries }) => {
  const [activities, setActivities] = useState();

  const getCountries = async () => {
    const url = "http://localhost:3000/getCountriesBasedOnActivities";
    const param = { val: activities };

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
      setCountries(
        countries.push([data[i].name, data[i].countrycode])
      );
    }

    return countries;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`submitted ${activities}`);

    if(countries.length !== 0) {
      setCountries(countries.splice(0))
    }

    setCountries(await getCountries());
  };

  const handleChange = (e) => {
    setActivities(e.target.value);
  };
  return (
    <div className="activities-container">
      <div className="acitivities-title">
        <h2>Activities</h2>
        <p className="activities-title-subtitle">
          Get the list of countries based on activities
        </p>
      </div>
      <div className="activities-body">
        <form onSubmit={handleSubmit}>
          <select onChange={handleChange} className="activities-select">
            <option value="select">Select</option>
            <option value="Safari">Safari</option>
            <option value="Mountain sports">Mountain sports</option>
            <option value="Water sports">Water sports</option>
            <option value="Winter sports">Winter sports</option>
            <option value="Historical sites">Historical sites</option>
          </select>
          <input
            type="submit"
            value="Submit"
            className="activities-btn-submit"
          ></input>
        </form>
      </div>
    </div>
  );
};

export default Activities;
