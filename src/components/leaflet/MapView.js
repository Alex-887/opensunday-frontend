import React, {Fragment, useEffect, useState} from 'react';
import {Map, Marker, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import UserMarkerPopup from "./UserMarkerPopup";
import Markers from './VenueMarkers';
import {
    AttractionIcon,
    BarIcon,
    MuseumIcon,
    RestaurantIcon, ShoppingIcon, SportPlaceIcon,
    VenueLocationIcon,
    VenueUserIcon,
    WellnessIcon
} from "./VenueLocationIcon";
import MarkerPopup from "./MarkerPopup";
import request from "../../utils/request";
import endpoints from "../../endpoints.json";
import {useAuth0} from "@auth0/auth0-react";


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

    }, [])

    //getting the id of the marker when clicking
    const onMarkerClick = (location) => {
        console.log("my id : " + location.id);
    };

    //different color according to the location category
    const switchIcon = (category) => {
        switch (category) {
            case 1:
                return (RestaurantIcon);
            case 2:
                return (BarIcon);
            case 3:
                return (WellnessIcon);
            case 4:
                return (MuseumIcon);
            case 5:
                return (AttractionIcon);
            case 6:
                return (ShoppingIcon);
            case 7:
                return (SportPlaceIcon);
            default:
                return (VenueLocationIcon);

        }
    }


//markers of the locations

    const markers = locations.map((location, id) => (
        <Marker key={id} position={[location.latitude, location.longitude]}
                icon={switchIcon(location.fK_Category)}
                onClick={() => onMarkerClick(location)}>
            <MarkerPopup data={location} />
        </Marker>
    ));


    //shortcut to store user latitude and longitude in an array
    const UserCoordinates = [UserLatitude, UserLongitude]

//marker of the user
    const VenueUserMarker = () => {
        const UserMarker = (
            <Marker position={
                UserCoordinates} icon={VenueUserIcon}>
                <UserMarkerPopup/>
            </Marker>
        );

        return <Fragment>{UserMarker}</Fragment>
    };

    return (

        <Map center={UserCoordinates} zoom={14}>
            <TileLayer
                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers}

            {isLocated === true && UserLatitude !== defaultUserLatitude && UserLongitude !== defaultUserLongitude &&
            <VenueUserMarker/>}

        </Map>
    );
}

export default MapView;
