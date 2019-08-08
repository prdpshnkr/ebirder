import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Landing.css'
import SearchButton from './SearchButton';

export const CurLatContext = React.createContext(0)
export const CurLonContext = React.createContext(0)

const Landing = () => {
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const [fAddress, setFAddress] = useState('')
  const [city, setCity] = useState('')

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setLat(lat)
        setLon(lon)
      });
    } else {
      console.log('geolocation not available');
    }
    const API_KEY = process.env.REACT_APP_API_KEY
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${API_KEY}`)
      .then(response => {
        setFAddress(response.data.results[0].formatted_address)
        setCity(response.data.results[0].address_components[0].long_name)
      })
      .catch(err => {
        console.log(err)
      })
  })

  return (
    <CurLonContext.Provider value={lon}>
      <CurLatContext.Provider value={lat}>
        <div className="App">
          <div className="App-header">
            <div className="search-box">
              <h1 className="heading-primary">
                <span className="heading-primary-main">eBirder</span>
                <span className="heading-primary-sub">search nearby birding hotspots</span>
              </h1>
              <div className="search-button">
                <SearchButton />
              </div>
              <h6><u>Current Location</u></h6>
              <h6 className="latlonText">Lattitude: {lat.toFixed(3)} || Longitude: {lon.toFixed(3)}</h6>
              <h6 className="latlonText">{city}</h6>
              <h6 className="latlonText">{fAddress}</h6>
            </div>
          </div>
        </div>
      </CurLatContext.Provider>
    </CurLonContext.Provider>
  );
}

export default Landing;