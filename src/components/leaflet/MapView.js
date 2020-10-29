import React, {Fragment, useEffect, useState} from 'react';
import {Map, Marker, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Markers from './VenueMarkers';
import {VenueUserIcon} from "./VenueLocationIcon";
import UserMarkerPopup from "./UserMarkerPopup";
import VenueUserMarker from "./VenueUserMarker";


//class that renders the Map component, later used in App.js
function MapView(props) {

    const locations = props.locations;
    //default coordinates on Zürich if the user doesn't give his geolocalisation info
    const defaultUserLatitude = 47.36667;
    const defaultUserLongitude = 8.55;

    const [UserLatitude, setUserLatitude] = useState(defaultUserLatitude);
    const [UserLongitude, setUserLongitude] = useState(defaultUserLongitude);
    const [isLocated, setIsLocated] = useState(false);


    useEffect(() => {
        if ("geolocation" in navigator) {


            //watchPosition() => for a user that moves around to track his position
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
        return () => {
            navigator.geolocation.clearWatch(0)
        };
    }, [])


    const UserCoordinates = [UserLatitude, UserLongitude]


    //should be in a class -> VenueUserMarker.js
    const VenueUserMarker = () => {
        const UserMarker = (
            //giving the localstorage user coordinates to the user marker
            <Marker position={
                [UserLatitude, UserLongitude]}
                    icon={VenueUserIcon}>
                <UserMarkerPopup/>
            </Marker>
        );
        //return all makers
        return <Fragment>{UserMarker}</Fragment>
    };


    //CONDITIONAL RENDERING
    //if the coordinates are not default one, we can display the user marker

        return (

            <Map center={UserCoordinates} zoom={13}>

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />


                {/* pass the data to the markers */}
                <Markers locations={locations} />


                {/*should be cleaner but can't make it work, see Venue UserMarker.js */}
                {/*<VenueUserMarker props={[UserCoordinates]}/>*/}
                {isLocated === true && UserLatitude !== defaultUserLatitude && UserLongitude !== defaultUserLongitude && <VenueUserMarker/>}


            </Map>
        );


}


export default MapView;
