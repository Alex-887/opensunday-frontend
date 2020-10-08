import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import data from '../../assets/data';
import Markers from './VenueMarkers';

//class that renders the Map component, later used in App.js
class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //intial location (written in latitude and longitude)
      currentLocation: { lat: 52.52437, lng: 13.41053 },
      zoom: 12,
    }
  }

  render() {
    const { currentLocation, zoom } = this.state;

    return (
      <Map center={currentLocation} zoom={zoom}>
        {/* this component adds the titles of the map */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {/* pass the data to the markers */}
        <Markers venues={data.venues}/>
      </Map>
    );
  }
}

export default MapView;
