import React, { Fragment } from 'react'
//import Marker compononent
import {Marker} from 'react-leaflet';
//importing custom marker the created object from VenueLocationIcon
import {VenueLocationIcon} from './VenueLocationIcon';
import MarkerPopup from './MarkerPopup';

const VenueMarkers = (props) => {
  //we get the props from the Mapview.js
  const { venues } = props;

  const markers = venues.map((venue, index) => (
      //we pass the location + position
    <Marker key={index} position={venue.geometry} icon={VenueLocationIcon} >
      //pass the venue pro
      <MarkerPopup data={venue}/>
    </Marker>
  ));

  //return all makers
  return <Fragment>{markers}</Fragment>
};

export default VenueMarkers;
