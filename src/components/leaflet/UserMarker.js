import React, { Fragment } from 'react'
//import Marker compononent
import {Marker} from 'react-leaflet';
//importing custom marker the created object from VenueLocationIcon
import {VenueUserIcon} from './VenueLocationIcon';
import MarkerPopup from './MarkerPopup';


const VenueUserMarker = (props) => {


    const { venues } = props;

    const UserMarker = venues.map(() => (


        //giving the localstorage user coordinates to the user marker
        <Marker position={[localStorage.getItem('UserLatitude'),
                localStorage.getItem('UserLongitude')]}
                icon={VenueUserIcon} >

            <MarkerPopup data={"Hey"}/>
        </Marker>
    ));

    //return all makers
    return <Fragment>{UserMarker}</Fragment>
};




export default VenueUserMarker;
