import React, { useEffect } from "react";
import "./Climate.css";

const Climate = ({
  climate,
  setClimate,
  countries,
  setCountries,
}) => {

  const getCountries = async () => {
    const url = "http://localhost:3000/getCountriesBasedOnClimate";
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({climate: climate}),
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

  const handleChange = (e) => {
    setClimate(e.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      if (countries.length !== 0) {
      setCountries(countries.splice(0));
      }

      if(climate !== undefined) {
      const data = await getCountries()
      setCountries(await listCountries(data));
      }
    }
    fetchData()
  }, [climate])

  return (
    <div className="climate-container">
      <div>
        <h2 className="climate-title">Climate</h2>
        <p className="climate-subtitle">
          Select your favorite climate from the options below to get the
          corresponding country.
        </p>
      </div>
      <div className="climate-body">
        <div>
          <select
            name="climate"
            onChange={handleChange}
            className="climate-select"
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled>
              Select
            </option>
            <option value="tropical">Tropical</option>
            <option value="dry">Dry</option>
            <option value="temperate">Temperate</option>
            <option value="continental">Continental</option>
            <option value="polar">Polar</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Climate;
