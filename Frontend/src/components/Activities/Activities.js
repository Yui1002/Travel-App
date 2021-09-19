import React, { useState, useEffect } from "react";
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

  const handleChange = (e) => {
    setActivities(e.target.value);
  };

  useEffect(async () => {
    if (countries.length !== 0) {
      setCountries(countries.splice(0));
      setActivitiesCountries(activitiesCountries.splice(0));
    }

    if(activities !== undefined) {
      const data = await getCountries()
      setCountries(await listCountries(data));
      setActivitiesCountries(await listActivitiesCountries(data))
    }
  }, [activities])

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
