import React, { useState } from "react";
import Header from "./components/Header/Header";
import Distance from "./components/Distance/Distance";
import Climate from "./components/Climate/Climate";
import Budget from "./components/Budget/Budget";
import Activities from "./components/Activities/Activities";
import CountryList from "./components/CountryList/CountryList";
import Priority from "./components/Priority/Priority";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [distanceCountries, setDistanceCountries] = useState([]);
  const [climateCountries, setClimateCountries] = useState([]);
  const [budgetCountries, setBudgetCountries] = useState([]);
  const [activitiesCountries, setActivitiesCountries] = useState([]);

  return (
    <React.Fragment>
      <Header />
      <div className="main-upper">
        <Distance
          countries={countries}
          setCountries={setCountries}
          distanceCountries={distanceCountries}
          setDistanceCountries={setDistanceCountries}
        />
        <Climate
          countries={countries}
          setCountries={setCountries}
          climateCountries={climateCountries}
          setClimateCountries={setClimateCountries}
        />
        <Budget
          countries={countries}
          setCountries={setCountries}
          budgetCountries={budgetCountries}
          setBudgetCountries={setBudgetCountries}
        />
        <Activities
          countries={countries}
          setCountries={setCountries}
          activitiesCountries={activitiesCountries}
          setActivitiesCountries={setActivitiesCountries}
        />
      </div>
      <div className="main-middle">
        <Priority
          countries={countries}
          setCountries={setCountries}
          distanceCountries={distanceCountries}
          climateCountries={climateCountries}
          budgetCountries={budgetCountries}
          activitiesCountries={activitiesCountries}
        />
      </div>
      <div className="main-lower">
        {countries.length !== 0 ? 
        <p className="matched-count">{countries.length} countries matched</p> : <p className="matched-count">No countries matched</p>}
        <CountryList countries={countries} />
      </div>
    </React.Fragment>
  );
};

export default App;
