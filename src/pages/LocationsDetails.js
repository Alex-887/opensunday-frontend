import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Link, Switch, Route} from "react-router-dom";
import LocationDetails from "./LocationDetails";
import request from "../utils/request";
import endpoints from "../endpoints.json";


function LocationsDetails() {

    const [isActive, setActive] = useState(false);
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




    function addLocation(location) {
        setLocations((prevLocations) => [location, ...prevLocations]);
    }


    let {
        loading,
        loginWithRedirect,
        logout,
        getAccessTokenSilently,
        isAuthenticated,
    } = useAuth0();


    return (
        <div className="LocationsDetails">


            <Switch>
                <Route
                    path="/LocationsDetails/"
                    exact
                    render={() => (
                        <>
                            <a
                                className="App-link"
                                href="/LocationsDetails/#"
                                onClick={() => setActive(isActive => !isActive)}
                            >
                                Get Locations
                            </a>
                            {isActive ? (
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
                            ) : <></>

                            }
                        </>
                    )}
                />
                <Route path="/location/:id" component={LocationDetails}/>
            </Switch>
            <br/>




        </div>
    );

}


export default LocationsDetails;