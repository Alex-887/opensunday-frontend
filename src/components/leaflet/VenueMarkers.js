import React, {Fragment, useState} from 'react'
//import Marker compononent
import {Marker} from 'react-leaflet';
//importing custom marker the created object from VenueLocationIcon
import {
    AttractionIcon,
    BarIcon,
    MuseumIcon,
    RestaurantIcon,
    ShoppingIcon,
    SportPlaceIcon,
    VenueLocationIcon,
    WellnessIcon
} from './VenueLocationIcon';
import MarkerPopup from './MarkerPopup';

function VenueMarkers(props) {
    //we get the props from the Mapview.js
    const {locations} = props;


    const onMarkerClick = (location) => {
        console.log("my id : " + location.id);

    };



    const markers = locations.map((location, id) => (
        //we pass the location + position


        <Marker key={id} position={[location.latitude, location.longitude]}
                onClick={() => onMarkerClick(location)}>
            <MarkerPopup data={location}/>


        </Marker>

    ));

    return <Fragment>{markers}</Fragment>
}


export default VenueMarkers;
