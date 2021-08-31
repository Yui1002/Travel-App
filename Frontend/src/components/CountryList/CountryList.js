import React from "react";
import Countries from "../Countries/Countries";

const CountryList = ({countries}) => {
  return (
    <div className="main-lower">
      <ul className="app-list-container">
        {countries.length > 0 ? (
          countries.map((data) => <Countries data={data} />)
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

export default CountryList;
