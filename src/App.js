import React, {useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import request from "./utils/request";
import endpoints from "./endpoints";
import Loading from "./components/location/Loading";
import {BrowserRouter, Link, Switch, Route} from "react-router-dom";
import LocationDetails from "./pages/LocationDetails";
import "./App.css";
import MapView from './components/leaflet/MapView';
import Grid from '@material-ui/core/Grid';
import {Dropdown} from 'semantic-ui-react'
import {green} from "@material-ui/core/colors";


function App() {
    let [locations, setLocations] = useState([]);

    let {
        loading,
        loginWithRedirect,
        logout,
        getAccessTokenSilently,
        isAuthenticated,
    } = useAuth0();

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

    let handleLogoutClick = async (e) => {
        e.preventDefault();
        /*
        returnTo parameter is necessary because multiple
        apps use the same authentication backend
        */
        logout({returnTo: window.location.origin});
    };

    if (loading) {
        return <Loading/>;
    }

    return (
        <div className="App">
            <header className="App-header">
                {isAuthenticated && (
                    <a
                        className="App-link Logout-link"
                        href="#"
                        onClick={handleLogoutClick}
                    >
                        Logout
                    </a>
                )}
                <h1>OpenSunday!</h1>
                <BrowserRouter>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={() => (
                                <>
                                    <a
                                        className="App-link"
                                        href="#"
                                        onClick={handleLocationsClick}
                                    >
                                        Get Locations
                                    </a>
                                    {locations && locations.length > 0 && (
                                        <ul className="Locations-List">
                                            {locations.map((location) => (
                                                <li key={location.id}>
                                                    <Link
                                                        className="App-link"
                                                        to={`/location/${location.id}`}
                                                    >
                                                        {location.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            )}
                        />
                        <Route path="/location/:id" component={LocationDetails}/>
                    </Switch>
                </BrowserRouter>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <div className="infos">
                            <div >
                                Catégorie
                            </div>
                            <div>
                                Nom restaurant
                            </div>
                            <button>Like 👍</button>
                            <button>Dislike👎</button>
                            <div>
                                Score :
                            </div>
                            <p>
                                Horaires:
                            </p>
                            <p className="button_open">Open</p>
                            <div>
                                From 12-10pm
                            </div>
                            <div >
                                Telephone : +41 799249044
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={10}>
                        <div className="App">
                            <MapView/>
                        </div>
                    </Grid>
                    <br/>
                    <Grid container spacing={3}>
                    </Grid>
                </Grid>

            </header>
        </div>
    );
}

export default App;
