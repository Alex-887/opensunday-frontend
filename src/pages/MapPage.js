import React, {useEffect, useState} from "react";
import MapView from "../components/leaflet/MapView";
import request from "../utils/request";
import endpoints from "../endpoints.json";
import {useAuth0} from "@auth0/auth0-react";
import Loading from "../components/location/Loading";


function MapPage() {

    const [locations, setLocations] = useState([]);


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
        loading,
        loginWithRedirect,
        logout,
        getAccessTokenSilently,
        isAuthenticated,
    } = useAuth0();





    if (loading) {
        return <Loading/>;
    }


    return(
        <div className="mappage">

                    <MapView locations={locations}/>

        </div>
    );
}

export default MapPage;