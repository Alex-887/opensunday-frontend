import React, {useState} from "react";
import "./Location.css";
import {Popup} from "react-leaflet";
import request from "../../utils/request";
import endpoints from "../../endpoints.json";
import {useAuth0} from "@auth0/auth0-react";
import {Link} from "react-router-dom";

export default function Location(props) {
     const { ...locationsData } = props;
    let {
        loginWithRedirect,
        getAccessTokenSilently,
    } = useAuth0();

    const handleDelete = async locationId => {

      await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.postLocations}/${locationId}`,
            getAccessTokenSilently,
            loginWithRedirect,
            "DELETE"
        )
    }

    return (
        <div className="location">
            <h1>{locationsData.name}</h1>
            <br/>
            <h2>Address : {locationsData.address}</h2>
            <p>Telephone : {locationsData.telephone}</p>
            <p>Opens at : {locationsData.openingTime}</p>
            <p>Closes at : {locationsData.closingTime}</p>
            <p>Category : {locationsData.fK_Category}</p>
            <p>City : {locationsData.fK_City}</p>

            <Link to="/LocationsDetails/">
            <button type="submit" onClick={() => handleDelete(locationsData.id)}>Delete</button>
            </Link>
        </div>
    );
}