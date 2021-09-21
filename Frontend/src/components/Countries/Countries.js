import React from "react";
import './Countries.css'

const Countries = ({ country }) => {
  return (
    <li className="country-item">
      <p className="country-item-name">{country[0]}</p>
      <img className="country-item-image" src={`https://www.countryflags.io/${country[1]}/flat/64.png`} alt={country[1]} />
    </li>
  );
};

export default Countries;
