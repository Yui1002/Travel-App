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

  return (
    <React.Fragment>
      <Header />
      <div className="main">
        <Distance countries={countries} setCountries={setCountries} />
        <Climate countries={countries} setCountries={setCountries} />
        <Budget countries={countries} setCountries={setCountries} />
        <Activities countries={countries} setCountries={setCountries} />
      </div>
      <div className="country-list">
        <CountryList countries={countries} />
      </div>
      <div className="priority">
        <Priority />
      </div>
    </React.Fragment>
  );
};

export default App;
