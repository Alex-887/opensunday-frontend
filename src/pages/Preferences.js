import React, {useEffect, useState} from "react";
import MapView from "../components/leaflet/MapView";
import request from "../utils/request";
import endpoints from "../endpoints.json";
import {useAuth0} from "@auth0/auth0-react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Preference from "./Preference";


function Preferences() {

    const [locations, setLocations] = useState([]);


    let handleLocationsClick = async (e) => {
        e.preventDefault();
        async function getLocations() {
            let locations = await request(
                `${process.env.REACT_APP_SERVER_URL}${endpoints.user}`,
                getAccessTokenSilently,
                loginWithRedirect
            );
            if (locations && locations.length > 0) {
                console.log(locations);
                setLocations(locations);
            }
        }
    };

    useEffect(() => {
        async function getLocations() {
            let locations = await request(
                `${process.env.REACT_APP_SERVER_URL}${endpoints.user}`,
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
            <h1>My Favorites</h1>
            <br/>
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/Preferences/"
                        exact
                        render={() => (
                            <>
                                {handleLocationsClick}
                                <ul className="Locations-List">
                                    {locations.map((location) => (
                                        <li key={location.id}>
                                            <Link
                                                className="App-link"
                                                to={`/Preferences/location/${location.id}`}>
                                                {location.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    />
                    <Route path="/Preferences/location/:id" component={Preference}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default Preferences;