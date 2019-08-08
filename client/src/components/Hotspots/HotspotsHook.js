import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';

import './Hotspots.css'
import { load_google_maps, load_hotspots } from '../../utils'
import HotspotsSideBarList from './HotspotsSideBarList'


class HotspotsByLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }
  }

  componentDidMount() {
    let googleMapsPromise = load_google_maps();
    let hotspotsPromise = load_hotspots()
    Promise.all([
      googleMapsPromise,
      hotspotsPromise,
    ])
      .then(values => {
        console.log(values)
        let google = values[0];
        this.hotspots = values[1];

        this.google = google;
        this.markers = [];
        this.infowindow = new google.maps.InfoWindow();
        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          scrollwheel: true,
          center: { lat: this.hotspots[0].lat, lng: this.hotspots[0].lng }
        });

        this.hotspots.forEach(hotspot => {
          let marker = new google.maps.Marker({
            position: { lat: hotspot.lat, lng: hotspot.lng },
            map: this.map,
            hotspot: hotspot,
            id: hotspot.locID,
            name: hotspot.locName,
            animation: google.maps.Animation.DROP
          });

          marker.addListener('click', () => {
            if (marker.getAnimation() !== null) { marker.setAnimation(null); }
            else { marker.setAnimation(google.maps.Animation.BOUNCE); }
            setTimeout(() => { marker.setAnimation(null) }, 1500);
          });

          google.maps.event.addListener(marker, 'click', () => {
            this.infowindow.setContent(marker.name);
            // this.map.setZoom(13);
            this.map.setCenter(marker.position);
            this.infowindow.open(this.map, marker);
            this.map.panBy(0, -125);
          });

          this.markers.push(marker)
        });

        this.setState({ filteredVenues: this.hotspots })
      })
  }

  listItemClick = (hotspot) => {
    let marker = this.markers.filter(m => m.id === hotspot.locID)[0]
    this.infowindow.setContent(marker.name);
    this.map.setCenter(marker.position);
    this.infowindow.open(this.map, marker);
    this.map.panBy(0, -125);
    if (marker.getAnimation() !== null) { marker.setAnimation(null); }
    else { marker.setAnimation(this.google.maps.Animation.BOUNCE); }
    setTimeout(() => { marker.setAnimation(null) }, 1500);
  }

  filterVenues = (query) => {
    let f = this.hotspots.filter(hotspot => hotspot.locName.toLowerCase().includes(query.toLowerCase()))
    this.markers.forEach(marker => {
      console.log(marker)
      marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
        marker.setVisible(true) :
        marker.setVisible(false)
    });
    this.setState({ filteredVenues: f, query })
  }

  render() {
    return (
      <Grid>
        <div>
          <div id="map">

          </div>
        </div>
        <div>
          <HotspotsSideBarList listItemClick={this.listItemClick} filterVenues={this.filterVenues} filteredVenues={this.state.filteredVenues} />
        </div>

        <div id="sidebar-inner">
          <input placeholder="Filtered Content" value={this.state.query} onChange={(e) => { this.filterVenues(e.target.value) }} />
        </div>
      </Grid>
    )
  }
}

export default HotspotsByLocation