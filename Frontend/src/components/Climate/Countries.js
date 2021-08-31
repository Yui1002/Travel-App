import React from 'react';

const Countries = ({data}) => {
    return (
        <li className="country-item">
        <p className="country-item-name">{data[0]}</p>
        <img className="country-item-image" src={`https://www.countryflags.io/${data[1]}/flat/64.png`} />
      </li>
    );
}
 
export default Countries;