import React, {useEffect, useState} from "react";
import request from "../utils/request";
import endpoints from "../endpoints.json";
import {useAuth0} from "@auth0/auth0-react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Preference from "./Preference";
import ListGroup from "react-bootstrap/ListGroup";

function Preferences() {
    //Declaration Variables
    //============== Hooks =================
    const [locations, setLocations] = useState([]);

    let {
        loginWithRedirect,
        getAccessTokenSilently,
    } = useAuth0();

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

    //============== methods - functions =================
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
                                <ListGroup className="list-group">
                                    {locations.map((location) => (
                                        <ListGroup.Item key={location.id} className="list-group-item">
                                            <Link

                                                to={`/Preferences/location/${location.id}`}>
                                                {location.name}
                                            </Link>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
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