import React, { useEffect, useState } from "react";
import "./Budget.css";

const Budget = ({
  countries,
  setCountries,
  budgetCountries,
  setBudgetCountries,
}) => {
  const [costs, setCosts] = useState();

  const getCountries = async () => {
    const url = "http://localhost:3000/getCountriesBasedOnBudget";
    const param = { val: costs };

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
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

  const listBudgetCountries = (data) => {
    for (let i = 0; i < data.length; i++) {
      setBudgetCountries(budgetCountries.push([data[i].name, data[i].countrycode]));
    }
    return budgetCountries;
  }

  const handleChange = (e) => {
    setCosts(e.target.value);
  };

  useEffect(async () => {
    if (countries.length !== 0) {
      setCountries(countries.splice(0));
      setBudgetCountries(budgetCountries.splice(0));
    }

    if(costs !== undefined) {
      const data = await getCountries();
      setCountries(await listCountries(data))
      setBudgetCountries(await listBudgetCountries(data))
    }
  }, [costs])

  return (
    <div className="budget-container">
      <div>
        <h2 className="budget-title">Budget</h2>
        <p className="budget-subtitle">
          Select your favorite budget from the options below to get the corresponding country. This is based on the cost of living index
        </p>
      </div>
      <div className="budget-body">
        <div>
          <select onChange={handleChange} className="budget-select" defaultValue={"DEFAULT"}>
            <option value="DEFAULT" disabled>Select</option>
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
