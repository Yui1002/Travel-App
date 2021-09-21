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
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [distance, setDistance] = useState();
  const [climate, setClimate] = useState();
  const [budget, setBudget] = useState();
  const [activity, setActivity] = useState();

  return (
    <React.Fragment>
      <Header />
      <div className="main-upper">
        <Distance
          latitude={latitude}
          longitude={longitude}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          distance={distance}
          setDistance={setDistance}
          countries={countries}
          setCountries={setCountries}
        />
        <Climate
          climate={climate}
          setClimate={setClimate}
          countries={countries}
          setCountries={setCountries}
        />
        <Budget
          budget={budget}
          setBudget={setBudget}
          countries={countries}
          setCountries={setCountries}
        />
        <Activities
          activity={activity}
          setActivity={setActivity}
          countries={countries}
          setCountries={setCountries}
        />
      </div>
      <div className="main-middle">
        <Priority
          latitude={latitude}
          longitude={longitude}
          distance={distance}
          climate={climate}
          budget={budget}
          activity={activity}
          countries={countries}
          setCountries={setCountries}
        />
      </div>
      <div className="main-lower">
        <CountryList countries={countries} />
      </div>
    </React.Fragment>
  );
};

export default App;
