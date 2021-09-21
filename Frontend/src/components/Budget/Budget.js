import React, { useEffect } from "react";
import "./Budget.css";

const Budget = ({ budget, setBudget, countries, setCountries }) => {
  const getCountries = async () => {
    const url = "http://localhost:3000/getCountriesBasedOnBudget";
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ budget: budget }),
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
    setBudget(e.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      if (countries.length !== 0) {
      setCountries(countries.splice(0));
      }

      if(budget !== undefined) {
      const data = await getCountries()
      setCountries(await listCountries(data));
      }
    }
    fetchData()
  }, [budget])
  
  return (
    <div className="budget-container">
      <div>
        <h2 className="budget-title">Budget</h2>
        <p className="budget-subtitle">
          Select your favorite budget from the options below to get the
          corresponding country. This is based on the cost of living index
        </p>
      </div>
      <div className="budget-body">
        <div>
          <select
            onChange={handleChange}
            className="budget-select"
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled>
              Select
            </option>
            <option value="high">High</option>
            <option value="upper-middle">Upper-middle</option>
            <option value="lower-middle">Lower-middle</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Budget;
