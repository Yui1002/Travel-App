import React, { useEffect, useState } from "react";
import loading_icon from "./loading.gif";
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
  const [loading, setLoading] = useState(false);

  const getUserLocation = () => {
    setLoading(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      return "Geolocation is not supported by this browser";
    }
  };

  const showPosition = (position) => {
    setLatitude(position.coords.latitude.toFixed(1));
    setLongitude(position.coords.longitude.toFixed(1));

    setLoading(false);
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
    return data;
  };

  const listCountries = (data) => {
    for (let i = 0; i < data.length; i++) {
      setCountries(countries.push([data[i].name, data[i].countrycode]));
    }
    return countries;
  };

  const listDistanceCountries = (data) => {
    for (let i = 0; i < data.length; i++) {
      setDistanceCountries(
        distanceCountries.push([data[i].name, data[i].countrycode])
      );
    }
    return distanceCountries;
  };

  const handleChange = (event) => {
    setDistance(event.target.value);
  };

  useEffect(async () => {
    if (countries.length !== 0) {
      setCountries(countries.splice(0));
      setDistanceCountries(distanceCountries.splice(0));
    }

    if (distance !== undefined) {
      const data = await getCountries();
      setCountries(await listCountries(data));
      setDistanceCountries(await listDistanceCountries(data));
    }
  }, [distance]);

  return (
    <div className="distance-container">
      <div>
        <h2 className="distance-title">Distance</h2>
        <p className="distance-subtitle">
          Select your favorite distance from the options below to get the
          corresponding country.
        </p>
      </div>

      <div className="distance-body">
        <div className="distance-location">
          {!loading && latitude === undefined && longitude === undefined && (
            <p className="distance-first-lcoation">Get your location first!</p>
          )}
          <button
            className="btn-get-location"
            onClick={() => getUserLocation()}
          >
            Get Location
          </button>
          {loading && (
            <div className="distance-loading-icon">
              <img src={loading_icon} alt="loading" />
            </div>
          )}
          {!loading && latitude !== undefined && longitude !== undefined && (
            <p className="distance-location-result">
              Got your location!
              <br />
              <p className="distance-location-result">
                Select your favorite distance below
              </p>
            </p>
          )}
        </div>

        {latitude !== undefined && longitude !== undefined && (
          <div>
            <select
              name="distance"
              onChange={handleChange}
              className="distance-select"
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Select
              </option>
              <option value="3000">〜3000km</option>
              <option value="5000">〜5000km</option>
              <option value="7000">〜7000km</option>
              <option value="10000">〜10000km</option>
              <option value="15000">〜15000km</option>
              <option value="more15000">15000km〜</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default Distance;
