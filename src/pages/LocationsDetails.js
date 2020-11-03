import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {BrowserRouter, Link, Switch, Route} from "react-router-dom";
import LocationDetails from "./LocationDetails";
import request from "../utils/request";
import endpoints from "../endpoints.json";


function LocationsDetails() {

    const [locations, setLocations] = useState([]);


    let handleLocationsClick = async (e) => {
        e.preventDefault();
        let locations = await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.locations}`,
            getAccessTokenSilently,
            loginWithRedirect
        );

        if (locations && locations.length > 0) {
            console.log(locations);
            setLocations(locations);
        }
    };


    useEffect(() => {

        async function getLocations() {
            let locations = await request(
                `${process.env.REACT_APP_SERVER_URL}${endpoints.locations}`,
                getAccessTokenSilently,
                loginWithRedirect
            );


            if (locations && locations.length > 0) {
                console.log(locations);
                setLocations(locations);
            }
        }

        getLocations();
    }, []);




    let {
        loginWithRedirect,
        getAccessTokenSilently,
    } = useAuth0();


    return (
        <div className="LocationsDetails">
            <h1>Locations available</h1>


            <br/>
            <BrowserRouter>

            <Switch>

                <Route
                    path="/LocationsDetails/"
                    exact
                    render={() => (
                        <>
                            {handleLocationsClick}
                            <ul className="Locations-List">
                                {locations.map((location) => (
                                    <li key={location.id}>
                                        <Link
                                            className="App-link"
                                            to={`/LocationsDetails/location/${location.id}`}>
                                            {location.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                />
                <Route path="/LocationsDetails/location/:id" component={LocationDetails}/>
            </Switch>
            </BrowserRouter>
        </div>
    );

}


export default LocationsDetails;