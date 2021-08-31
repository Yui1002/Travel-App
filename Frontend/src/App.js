import React, { useState } from "react";
import Header from "./components/Header/Header";
import Distance from "./components/Distance/Distance";
import Climate from "./components/Climate/Climate";
import Budget from "./components/Budget/Budget";
import Activities from "./components/Activities/Activities";
import CountriesByDistance from "./components/Distance/Countries";
import CountriesByClimate from "./components/Climate/Countries";
import CountriesByBudget from "./components/Budget/Countries";
import CountriesByActivities from "./components/Activities/Countries";
import "./App.css";

const App = () => {
  const [countriesByDistance, setCountriesByDistance] = useState([]);
  const [countriesByClimate, setCountriesByClimate] = useState([]);
  const [countriesByBudget, setCountriesByBudget] = useState([]);
  const [countriesByActivities, setCountriesByActivities] = useState([]);

  return (
    <React.Fragment>
      <Header />
      <div className="main">
        <Distance
          countriesByDistance={countriesByDistance}
          setCountriesByDistance={setCountriesByDistance}
        />
        <Climate
          countriesByClimate={countriesByClimate}
          setCountriesByClimate={setCountriesByClimate}
        />
        <Budget
          countriesByBudget={countriesByBudget}
          setCountriesByBudget={setCountriesByBudget}
        />
        <Activities
          countriesByActivities={countriesByActivities}
          setCountriesByActivities={setCountriesByActivities}
        />
      </div>
      <div className="main-lower">
        <ul className="app-list-container">
          {countriesByDistance.length > 0 ? (
            countriesByDistance.map((data) => (
              <CountriesByDistance data={data} />
            ))
          ) : (
            <></>
          )}
        </ul>
        <ul className="app-list-container">
          {countriesByClimate.length > 0 ? (
            countriesByClimate.map((data) => <CountriesByClimate data={data} />)
          ) : (
            <></>
          )}
        </ul>
        <ul className="app-list-container">
          {countriesByBudget.length > 0 ? (
            countriesByBudget.map((data) => <CountriesByBudget data={data} />)
          ) : (
            <></>
          )}
        </ul>
        <ul className="app-list-container">
          {countriesByActivities.length > 0 ? (
            countriesByActivities.map((data) => <CountriesByActivities data={data} />)
          ) : (
            <></>
          )}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default App;
