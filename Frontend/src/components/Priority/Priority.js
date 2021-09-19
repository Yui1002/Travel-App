import React from "react";
import './Priority.css'

const Priority = ({
  countries,
  setCountries,
  distanceCountries,
  climateCountries,
  budgetCountries,
  activitiesCountries,
}) => {
  const handleClick = async () => {
    const duplicates = getDuplicateValues();
    const data = await getCountryCode(duplicates);
    await setCountries(data);
  };

  const getDuplicateValues = () => {
    let arr1 = [];
    let arr2 = [];
    for (let i = 0; i < distanceCountries.length; i++) {
      arr1.push(distanceCountries[i][0]);
    }
    for (let i = 0; i < climateCountries.length; i++) {
      arr2.push(climateCountries[i][0]);
    }

    arr1 = arr1.filter((val) => arr2.includes(val));
    arr2 = [];
    for (let i = 0; i < budgetCountries.length; i++) {
      arr2.push(budgetCountries[i][0]);
    }
    arr1 = arr1.filter((val) => arr2.includes(val));
    arr2 = [];
    for (let i = 0; i < activitiesCountries.length; i++) {
      arr2.push(activitiesCountries[i][0]);
    }
    arr1 = arr1.filter((val) => arr2.includes(val));
    arr2 = [];
    return arr1;
  };

  const getCountryCode = async (duplicates) => {
    const url = "http://localhost:3000/getCountriesMatched";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        country: duplicates,
      })
    });
    const data = await response.json();
    return data;
  };

  return (
    <>
      <button className="priority-btn" onClick={handleClick}>
        Get the countries that matches all your choices
      </button>
    </>
  );
};

export default Priority;
