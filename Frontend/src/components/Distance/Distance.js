import React, { useState } from "react";
import loading_icon from './loading.gif'
import "./Distance.css";

const Distance = ({
  countries,
  setCountries,
  distanceCountries,
  setDistanceCountries,
}) => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [distance, setDistance] = useState();
  const [icon, setIcon] = useState('hidden')
  const [form, setForm] = useState('hidden')

  const toggleIcon = () => {
    setIcon('show')
  }

  const toggleForm = () => {
    setForm('show')
  }

  const getUserLocation = () => {
    toggleIcon()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      return "Geolocation is not supported by this browser";
    }
  };

  const showPosition = (position) => {
    setLatitude(position.coords.latitude.toFixed(1));
    setLongitude(position.coords.longitude.toFixed(1));

    toggleForm()
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
    return data
  };

  const listCountries = (data) => {
    for (let i = 0; i < data.length; i++) {
      setCountries(countries.push([data[i].name, data[i].countrycode]));
    }
    return countries
  }

  const listDistanceCountries = (data) => {
    for (let i = 0; i < data.length; i++) {
      setDistanceCountries(distanceCountries.push([data[i].name, data[i].countrycode]));
    }
    return distanceCountries
  }

  const handleChange = (event) => {
    setDistance(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (countries.length !== 0) {
      setCountries(countries.splice(0));
      setDistanceCountries(distanceCountries.splice(0));
    }

    const data = await getCountries();
    setCountries(await listCountries(data))
    setDistanceCountries(await listDistanceCountries(data))
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
        <div className="distance-location">
          <p>Get your location first!</p>
          <button className="btn-get-location"
            onClick={() => getUserLocation()}>
            Get Location
          </button>
          {latitude === undefined ? (
            <img src={loading_icon} alt='loading' 
            className={`icon_${icon}`}/>
          ) : (<p>Got your location!</p>)}
        </div>
        <form onSubmit={handleSubmit} className={`form_${form}`}>
          <select name="distance" onChange={handleChange}
            className="distance-select">
            <option value="notSelected">Select</option>
            <option value="3000">〜3000km</option>
            <option value="5000">〜5000km</option>
            <option value="7000">〜7000km</option>
            <option value="10000">〜10000km</option>
            <option value="15000">〜15000km</option>
            <option value="more15000">15000km〜</option>
          </select>
          <input type="submit" value="Save"
            className="distance-btn-submit"></input>
        </form>
      </div>
    </div>
  );
};

export default Distance;
