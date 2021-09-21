import React from "react";
import Countries from "../Countries/Countries";
import './CountryList.css'

const CountryList = ({ countries }) => {
  return (
    <div>
      {countries.length !== 0 ? (
        <p className="matched-count">{countries.length} countries matched</p>
      ) : (
        <p className="matched-count">No countries matched</p>
      )}
      <ul className="app-list-container">
        {countries.length > 0 &&
          countries.map((country) => <Countries country={country} />)}
      </ul>
    </div>
  );
};

export default CountryList;
