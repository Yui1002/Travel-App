import React, {useEffect, useState} from "react";
import Countries from './Countries'

const Distance = () => {
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [distance, setDistance] = useState()
  const [countries, setCountries] = useState([])

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      return "Geolocation is not supported by this browser";
    }
  }

  const showPosition = (position) => {
    setLatitude((position.coords.latitude).toFixed(1))
    setLongitude((position.coords.longitude).toFixed(1))
  }

  const getCountries = async(distance) => {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries/positions');
    const data = await response.json()

    if(distance === '3000') {

      const minLat = latitude - 15
      const maxLat = minLat + 30
      const minLon = longitude - 30
      const maxLon = minLon + 60

      for(let i = 0; i < data.data.length; i++) {
        let info = data.data[i]
        
        if(info.lat > minLat && info.lat < maxLat && info.long > minLon && info.long < maxLon) {
          setCountries(countries.push(info.name))
        }
      }
      return countries

    } else if(distance === '5000') {

      const minLat = latitude - 20
      const maxLat = minLat + 40
      const minLon = longitude - 40
      const maxLon = minLon + 80

      for(let i = 0; i < data.data.length; i++) {
        let info = data.data[i];

        if(info.lat > minLat && info.lat < maxLat && info.long > minLon && info.long < maxLon) {
          setCountries(countries.push(info.name))
        }
      }
      return countries

    } else if(distance === '7000') {

      const minLat = latitude - 30
      const maxLat = minLat + 60
      const minLon = longitude - 50
      const maxLon = minLon + 100

      for(let i = 0; i < data.data.length; i++) {
        let info = data.data[i];

        if(info.lat > minLat && info.lat < maxLat && info.long > minLon && info.long < maxLon) {
          setCountries(countries.push(info.name))
        }
      }
      return countries

    } else if(distance === '10000') {

      const minLat = latitude - 40
      const maxLat = minLat + 80
      const minLon = longitude - 60
      const maxLon = minLon + 120

      for(let i = 0; i < data.data.length; i++) {
        let info = data.data[i];

        if(info.lat > minLat && info.lat < maxLat && info.long > minLon && info.long < maxLon) {
          setCountries(countries.push(info.name))
        }
      }
      return countries

    } else if(distance === '15000') {

      const minLat = latitude - 50
      const maxLat = minLat + 100
      const minLon = longitude - 70
      const maxLon = minLon + 140

      for(let i = 0; i < data.data.length; i++) {
        let info = data.data[i];

        if(info.lat > minLat && info.lat < maxLat && info.long > minLon && info.long < maxLon) {
          setCountries(countries.push(info.name))
        }
      }
      return countries

    } else {

      for(let i = 0; i < data.data.length; i++) {
        let info = data.data[i];
        setCountries(countries.push(info.name))
      }
      return countries
    }
  }

  const handleChange = (event) => {
    setDistance(event.target.value)
  }

  const handleSubmit = async(event) => {
    console.log(`submitted: You chose ${distance}km `)
    event.preventDefault()

    setCountries(await getCountries(distance))
  }

  return (
    <div>
    <h1>Distance</h1>
    <p>You are at 
      <span> lat: {latitude}</span>
      <span> lon: {longitude}</span>
    </p>
    <button onClick={() => getUserLocation()}>Get my location</button>

    <form onSubmit={handleSubmit}>
      <select name="distance" onChange={handleChange}>
        <option value="notSelected">Select</option>
        <option value="3000">〜3000km</option>
        <option value="5000">〜5000km</option>
        <option value="7000">〜7000km</option>
        <option value="10000">〜10000km</option>
        <option value="15000">〜15000km</option>
        <option value="more15000">15000km〜</option>
      </select>
      <input type="submit" value="Submit"></input>
    </form>

    <p>Searching country with in {distance}km</p>
    <div>
      <ul>
        {countries.length > 0 ? 
        countries.map((data) => {
          return <li key={Math.random()}>{data}</li>
        })
        : <div>Loading...</div>}
      </ul>
    </div>
  </div>
  );
}
 
export default Distance;
