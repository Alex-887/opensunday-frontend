import React, { Fragment } from 'react'
//import Marker compononent
import {Marker} from 'react-leaflet';
//importing custom marker the created object from VenueLocationIcon
import {VenueLocationIcon} from './VenueLocationIcon';
import MarkerPopup from './MarkerPopup';

function VenueMarkers (props) {
  //we get the props from the Mapview.js
    const {locations} = props;

  const markers = locations.map((location, id) => (
      //we pass the location + position
    <Marker key={id} position={[location.latitude, location.longitude]} icon={VenueLocationIcon} >
      //pass the venue pro
      <MarkerPopup data={location}/>
    </Marker>
  ));

  //return all makers
  return <Fragment>{markers}</Fragment>
};



export default VenueMarkers;
