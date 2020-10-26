import React, { Fragment, useEffect, useState} from 'react';
import {Map, Marker, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Markers from './VenueMarkers';
import {VenueUserIcon} from "./VenueLocationIcon";
import UserMarkerPopup from "./UserMarkerPopup";
// import Routing from "./RoutingMachine";


//class that renders the Map component, later used in App.js
function MapView(props) {

    const locations = props.locations;
    //default coordinates on the middle of Switzerland (Niedwald) if the user doesn't give his geolocalisation info
    const defaultUserLatitude = 46.92739 ;
    const defaultUserLongitude = 8.4102;

    const [UserLatitude, setUserLatitude] = useState(defaultUserLatitude);
    const [UserLongitude, setUserLongitude] = useState(defaultUserLongitude);
    const [isLocated, setIsLocated] = useState(false);



    useEffect(() => {
        if ("geolocation" in navigator) {

            //Otherwise the browser keeps asking the user to give his location

            navigator.geolocation.getCurrentPosition(function (position) {
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

        return () => {navigator.geolocation.clearWatch(0)}

    }, [])



    const userPosition =  [UserLatitude, UserLongitude];


    const VenueUserMarker = () => {

        const UserMarker =  (

            //giving the localstorage user coordinates to the user marker
            <Marker position={
                [UserLatitude,
                    UserLongitude]}
                    icon={VenueUserIcon}>

                <UserMarkerPopup/>
            </Marker>

        );
        //return maker
        return <Fragment>{UserMarker}</Fragment>
    };


    //if the coordinates are not default one, we can display the user marker

    if (isLocated === true && UserLatitude !== defaultUserLatitude && UserLongitude !== defaultUserLongitude) {

        return (


            //the map will be on the user, if the user doesn't give his location, the map is by default on the middle of Switzerland
            <Map center={userPosition} zoom={13}>

                {/* this component adds the titles of the map */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {/* pass the data to the markers */}
                <Markers locations={locations}/>
                <VenueUserMarker venues={userPosition}/>

                {/*<Routing />*/}

            </Map>
        );

    }



    //the user didn't want to share his location => no user marker

    else {
        return (
            <Map center={userPosition} zoom={8}>
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
