import React, { useState } from "react";
import "./Activities.css";

const Activities = ({
  countries,
  setCountries,
  activitiesCountries,
  setActivitiesCountries,
}) => {
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
    return data
  };

  const listCountries = (data) => {
    for (let i = 0; i < data.length; i++) {
      setCountries(countries.push([data[i].name, data[i].countrycode]));
    }
    return countries;
  };

  const listActivitiesCountries = (data) => {
    for (let i = 0; i < data.length; i++) {
      setActivitiesCountries(activitiesCountries.push([data[i].name, data[i].countrycode]));
    }
    return activitiesCountries;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (countries.length !== 0) {
      setCountries(countries.splice(0));
      setActivitiesCountries(activitiesCountries.splice(0));
    }

    const data = await getCountries()
    setCountries(await listCountries(data));
    setActivitiesCountries(await listActivitiesCountries(data))
  };

  const handleChange = (e) => {
    setActivities(e.target.value);
  };
  return (
    <div className="activities-container">
      <div>
        <h2 className="acitivities-title">Activities</h2>
        <p className="activities-subtitle">
          Select your favorite activity from the options below to get the corresponding country.
        </p>
      </div>
      <div className="activities-body">
        <form onSubmit={handleSubmit}>
          <select onChange={handleChange} className="activities-select">
            <option disabled selected value>Select</option>
            <option value="safari">Safari</option>
            <option value="mountain sports">Mountain sports</option>
            <option value="water sports">Water sports</option>
            <option value="winter sports">Winter sports</option>
            <option value="historical sites">Historical sites</option>
          </select>
          <input
            type="submit"
            value="Save"
            className="activities-btn-submit"
          ></input>
        </form>
      </div>
    </div>
  );
};

export default Activities;
