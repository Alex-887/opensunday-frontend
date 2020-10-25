import React, { Fragment, useEffect, useState} from 'react';
import {Map, Marker, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import data from '../../assets/data';
import Markers from './VenueMarkers';
import {VenueUserIcon} from "./VenueLocationIcon";
import UserMarkerPopup from "./UserMarkerPopup";


//class that renders the Map component, later used in App.js
function MapView(props) {

    const locations = props.locations;
    //default coordinates on Zürich if the user doesn't give his geolocalisation info
    const defaultUserLatitude = 47.36667;
    const defaultUserLongitude = 8.55;

    const [UserLatitude, setUserLatitude] = useState(defaultUserLatitude);
    const [UserLongitude, setUserLongitude] = useState(defaultUserLongitude);
    const [isLocated, setIsLocated] = useState(false);
    const [hasAskedLocation, setHasAskedLocation] = useState(false);


    useEffect(() => {
        if ("geolocation" in navigator && hasAskedLocation === false) {

            //Otherwise the browser keeps asking the user to give his location
            setHasAskedLocation(true);


            navigator.geolocation.watchPosition(function (position) {
                    setIsLocated(true);
                    console.log("User latitude is :", position.coords.latitude);
                    console.log("User longitude is :", position.coords.longitude);

                    //set the user coordinates into the hook
                    setUserLatitude(position.coords.latitude)
                    setUserLongitude(position.coords.longitude)

                },
                function (error) {
                    console.error("Error Code = " + error.code + " - " + error.message);
                    setIsLocated(false);


                });
        }
    })

    const VenueUserMarker = (props) => {
        const {venues} = props;
        const UserMarker = venues.map(() => (

            //giving the localstorage user coordinates to the user marker
            <Marker position={
                [UserLatitude,
                    UserLongitude]}
                    icon={VenueUserIcon}>

                <UserMarkerPopup/>

            </Marker>

        ));
        //return all makers
        return <Fragment>{UserMarker}</Fragment>
    };


    //if the coordinates are not default one, we can display the user marker

    if (isLocated === true && UserLatitude !== defaultUserLatitude && UserLongitude !== defaultUserLongitude) {

        return (

            //the map will be on the user, if the user doesn't give his location, the map is by default on zurich
            <Map center={[UserLatitude, UserLongitude]} zoom={13}>



                {/* this component adds the titles of the map */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {/* pass the data to the markers */}
                <Markers locations={locations}/>
                <VenueUserMarker venues={[UserLatitude, UserLongitude]}/>

            </Map>
        );

    }



    //the user didn't want to share his location => no user marker

    else {
        return (
            <Map center={[UserLatitude, UserLongitude]} zoom={13}>
                {/* this component adds the titles of the map */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {/* pass the data to the markers */}
                <Markers locations={locations}/>
            </Map>
        );


    }


}

export default MapView;
