import React, {Fragment, useEffect, useState} from 'react';
import  {Map, Marker, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import UserMarkerPopup from "./UserMarkerPopup";
import Markers from './VenueMarkers';
import {VenueLocationIcon} from "./VenueLocationIcon";
import MarkerPopup from "./MarkerPopup";


//class that renders the Map component, later used in App.js
function MapView(props) {

    const locations = props.locations;
    //default coordinates on Niedwald if the user doesn't give his geolocalisation info
    const defaultUserLatitude = 47.36667;
    const defaultUserLongitude = 8.55;

    const [UserLatitude, setUserLatitude] = useState(defaultUserLatitude);
    const [UserLongitude, setUserLongitude] = useState(defaultUserLongitude);
    const [isLocated, setIsLocated] = useState(false);

    /*
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
    */

    const UserCoordinates = [UserLatitude, UserLongitude]

    const onMarkerClick = (location) =>
    {
        console.log("my id : " + location.id);
        sessionStorage.setItem('locationName', location.name);
    };


    const markers = locations.map((location, id) => (
        <Marker key={id} position={[location.latitude, location.longitude]} icon={VenueLocationIcon}
                onClick={() => onMarkerClick(location)}>
            <MarkerPopup data={location}/>
        </Marker>
    ));



    //should be in a class -> VenueUserMarker.js
    const VenueUserMarker = () => {
        const UserMarker = (
            //giving the localstorage user coordinates to the user marker
            <Marker position={
                [UserLatitude, UserLongitude]}
                    /*icon={VenueUserIcon}*/>
                <UserMarkerPopup/>
            </Marker>
        );
        //return all makers
        return <Fragment>{UserMarker}</Fragment>
    };

    return (
        <Map center={UserCoordinates} zoom={13}>
            <TileLayer
                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers}
        </Map>
    );
}

export default MapView;
