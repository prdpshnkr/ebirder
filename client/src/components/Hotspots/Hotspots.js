import React, { Fragment, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './Hotspots.css'
import { load_google_maps } from '../../utils'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Hotspots = (props) => {

  const [query, setQuery] = useState('')
  const [filteredVenues, setFilteredVenues] = useState()

  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)

  // let [markers, setMarkers] = useState([])
  // let [infowindow, setInfowindow] = useState()
  // let [map, setMap] = useState()
  // let [google, setGoogle] = useState()

  useEffect(() => {

    let googleMapsPromise = load_google_maps();

    const load_hotspots = () => {
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
      var apiURL = `https://ebird.org/ws2.0/ref/hotspot/geo?lat=${lat}&lng=${lon}&fmt=json`
      return fetch(apiURL, {
        headers: {
          'X-eBirdApiToken': 'bbrc0dgm44c7'
        }
      }).then(resp => resp.json())
    }

    let hotspotsPromise = load_hotspots()

    Promise.all([
      googleMapsPromise,
      hotspotsPromise,
    ])
      .then(values => {
        console.log(values)
        let hotspots = values[1]
        let google = values[0]
        let markers = [];
        let infowindow = new google.maps.InfoWindow()
        let map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          scrollwheel: true,
          center: { lat: lat, lng: lon }
        });

        hotspots.forEach(hotspot => {
          let marker = new google.maps.Marker({
            position: { lat: hotspot.lat, lng: hotspot.lng },
            map: map,
            hotspot: hotspot,
            id: hotspot.locID,
            name: hotspot.locName,
            animation: google.maps.Animation.DROP
          });

          marker.addListener('click', () => {
            if (marker.getAnimation() !== null) { marker.setAnimation(null); }
            else {
              marker.setAnimation(google.maps.Animation.BOUNCE);
            }
            setTimeout(() => { marker.setAnimation(null) }, 2000);
          });

          google.maps.event.addListener(marker, 'click', () => {
            infowindow.setContent(marker.name);
            map.setZoom(13);
            map.setCenter(marker.position);
            infowindow.open(map, marker);
            map.panBy(0, -125);
          });

          markers.push(marker);

        });

        // setFilteredVenues(values[1])

        let listItemClick = (hotspot) => {
          let marker = markers.filter(m => m.id === hotspot.locID)[0]
          infowindow.setContent(marker.name);
          map.setCenter(marker.position);
          infowindow.open(map, marker);
          map.panBy(0, -125);
          if (marker.getAnimation() !== null) { marker.setAnimation(null); }
          else { marker.setAnimation(google.maps.Animation.BOUNCE); }
          setTimeout(() => { marker.setAnimation(null) }, 1500);
        }

        let filterVenues = (query) => {
          let f = hotspots.filter(hotspot => hotspot.locName.toLowerCase().includes(query.toLowerCase()))
          markers.forEach(marker => {
            console.log(marker)
            marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
              marker.setVisible(true) :
              marker.setVisible(false)
          });
          setQuery({ filteredVenues: f, query })
        }

      })



  })



  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper id="sidebar" className={classes.paper}>
              <input value={query} onChange={(e) => { }} ></input>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper id="map" className={classes.paper}></Paper>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  )
}

export default Hotspots

