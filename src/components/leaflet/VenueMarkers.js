import React, {Fragment, useState} from 'react'
//import Marker compononent
import {Marker} from 'react-leaflet';
//importing custom marker the created object from VenueLocationIcon
import {BarIcon, CinemaIcon, MuseumIcon, RestaurantIcon, VenueLocationIcon} from './VenueLocationIcon';
import MarkerPopup from './MarkerPopup';

function VenueMarkers (props) {
  //we get the props from the Mapview.js
    const {locations} = props;


    const [iconMarker, setIconMarker] = useState(VenueLocationIcon);

    const onMarkerClick = (location) =>
    {
        console.log("my id : " + location.id);
        sessionStorage.setItem('locationName', location.name);

    };



    const switchIcon = (category) =>
    {

        switch(category)
        {
            case 1:  setIconMarker(RestaurantIcon);
            case 2:  setIconMarker(MuseumIcon);
            case 3:  setIconMarker(CinemaIcon);
            case 4:  setIconMarker(BarIcon);

        }

    }




  const markers = locations.map((location, id) => (
      //we pass the location + position


    <Marker key={id} position={[location.latitude, location.longitude]}
            icon ={switchIcon(location.fK_Category)}
            onClick={() => onMarkerClick(location)}>
        <MarkerPopup data={location}/>



    </Marker>

  ));

  return <Fragment >{markers}</Fragment>
};



export default VenueMarkers;
