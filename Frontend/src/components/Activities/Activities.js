import React, { useState, useEffect } from "react";
import "./Activities.css";

const Activities = ({
  activity,
  setActivity,
  countries,
  setCountries,
}) => {

  const getCountries = async () => {
    const url = "http://localhost:3000/getCountriesBasedOnActivities";
    const param = { val: activity };

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

  const handleChange = (e) => {
    setActivity(e.target.value);
  };

  useEffect(async () => {
    if (countries.length !== 0) {
      setCountries(countries.splice(0));
    }

    if(activity !== undefined) {
      const data = await getCountries()
      setCountries(await listCountries(data));
    }
  }, [activity])

  return (
    <div className="activities-container">
      <div>
        <h2 className="acitivities-title">Activities</h2>
        <p className="activities-subtitle">
          Select your favorite activity from the options below to get the corresponding country.
        </p>
      </div>
      <div className="activities-body">
        <div>
          <select onChange={handleChange} className="activities-select">
            <option disabled selected value>Select</option>
            <option value="safari">Safari</option>
            <option value="mountain sports">Mountain sports</option>
            <option value="water sports">Water sports</option>
            <option value="winter sports">Winter sports</option>
            <option value="historical sites">Historical sites</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Activities;
