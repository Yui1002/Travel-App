import React, { useState } from "react";
import './Distance.css'

const Distance = ({countries, setCountries}) => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [distance, setDistance] = useState();

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      return "Geolocation is not supported by this browser";
    }
  };

  const showPosition = (position) => {
    setLatitude(position.coords.latitude.toFixed(1));
    setLongitude(position.coords.longitude.toFixed(1));
  };

  const getCountries = async () => {
    const url = "http://localhost:3000/getCountriesBasedOnDistance";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lat: latitude,
        lon: longitude,
        distance: distance,
      }),
    });
    const data = await response.json();
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      setCountries(countries.push([data[i].name, data[i].countrycode]));
    }

    return countries;
  };

  const handleChange = (event) => {
    setDistance(event.target.value);
  };

  const handleSubmit = async (event) => {
    console.log(`submitted: You chose ${distance}km `);
    
    if(countries.length !== 0) {
      setCountries(countries.splice(0))
    }
    event.preventDefault();

    setCountries(await getCountries());
  };

  return (
    <div className="distance-container">
      <div className="distance-title">
        <h2>Distance</h2>
        <p className="distance-title-subtitle">
          Get the list of countries by distance
        </p>
      </div>
      <div className="distance-body">
        <div>
          <button
            className="btn-get-location"
            onClick={() => getUserLocation()}
          >
            Get Location
          </button>
          {latitude === undefined ? (
            <p>Get your location first!</p>
          ) : (
            <p>Got your location!</p>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <select
            name="distance"
            onChange={handleChange}
            className="distance-select"
          >
            <option value="notSelected">Select</option>
            <option value="3000">〜3000km</option>
            <option value="5000">〜5000km</option>
            <option value="7000">〜7000km</option>
            <option value="10000">〜10000km</option>
            <option value="15000">〜15000km</option>
            <option value="more15000">15000km〜</option>
          </select>
          <input
            type="submit"
            value="Submit"
            className="distance-btn-submit"
          ></input>
        </form>
      </div>
    </div>
  );
};

export default Distance;
