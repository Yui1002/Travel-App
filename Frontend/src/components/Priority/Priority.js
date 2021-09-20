import React, { useState } from "react";
import './Priority.css'

const Priority = ({
  latitude,
  longitude,
  distance,
  climate,
  budget,
  activity,
  countries,
  setCountries,
}) => {
  const [isEmpty, setIsEmpty] = useState(false)
  const handleClick = async () => {
    if(distance !== undefined && climate !== undefined && budget !== undefined && activity !== undefined) {
      setIsEmpty(false)
      const data = await getMatchedCountries();
      setCountries(await listCountries(data))
    } else {
      setIsEmpty(true)
    }
  };

  const getMatchedCountries = async () => {
    const url = "http://localhost:3000/getCountriesMatched"
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        latitude: latitude,
        longitude: longitude,
        distance: distance, 
        climate: climate, 
        budget: budget, 
        activity: activity,
      })
    });
    const data = await response.json();
    return data
  };

  const listCountries = (data) => {
    if(countries.length > 0) {
      countries = []
    }
    for (let i = 0; i < data.length; i++) {
      setCountries(countries.push([data[i].name, data[i].countrycode]));
    }
    return countries;
  }; 

  return (
    <>
      <button className="priority-btn" onClick={handleClick}>
        Get the countries that matches all your choices
      </button>
      {isEmpty && <p>Please select all options</p>}
    </>
  );
};

export default Priority;
