import React, {Component, useEffect, useState} from 'react';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import data from '../../assets/data';
import Markers from './VenueMarkers';
import UserMarker from "./UserMarker";
import VenueMarkers from "./VenueMarkers";





//class that renders the Map component, later used in App.js
function MapView()  {

  //default coordinates on Zürich if the user doesn't give his geolocalisation info
  const [UserLatitude, setUserLatitude] = useState(47.36667);
  const [UserLongitude, setUserLongitude] = useState( 8.55);


  useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function(position) {
          console.log("User latitude is :", position.coords.latitude);
          console.log("User longitude is :", position.coords.longitude);

          //set the user coordinates into the hook
          setUserLatitude(position.coords.latitude)
          setUserLongitude(position.coords.longitude)

          //localStorage.setItem('UserLatitude', position.coords.latitude);
         // localStorage.setItem('UserLongitude', position.coords.longitude);

        });
      }
  },[])

    return (

        //the map will be on the user, if the user doesn't give his location, the map is by default on zurich
      <Map center={[UserLatitude, UserLongitude]} zoom={13}>
        {/* this component adds the titles of the map */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {/* pass the data to the markers */}
        {<Markers venues={data.venues}/>}
        <UserMarker venues={[UserLatitude, UserLongitude, "Me"]}/>
      </Map>
    );
}

export default MapView;
