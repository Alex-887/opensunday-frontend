import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import request from "./utils/request";
import endpoints from "./endpoints";
import Loading from "./components/location/Loading";
import {BrowserRouter, Link, Switch, Route} from "react-router-dom";
import LocationDetails from "./pages/LocationDetails";
import "./App.css";
import MapView from './components/leaflet/MapView';
import Grid from '@material-ui/core/Grid';
import LoginButton from "./components/Login/LoginButton";


/* Location Form component - the UI & logic to add a new location */
function LocationForm() {

    // ==================== HOOKS ==========================
    const [newLocation, setNewLocation] = useState(
        {
            Id: '',
            Name: '',
            Creator: '',
            Latitude: '',
            Longitude: '',
            Address: '',
            Telephone: '',
            OpeningTime: '',
            ClosingTime: '',
            FK_Category: '',
            FK_City: '',
            IsVerified: ''
        });

    let {
        loginWithRedirect,
        getAccessTokenSilently,
    } = useAuth0();

    /* Add a ref for the title text input */
    // this.titleInputRef = React.createRef();

    // ==================== Functions ==========================
    /* Form input change handler */
    const handleFormInputChange = (e) => {
        const {name, value} = e.target;
        setNewLocation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const body = JSON.stringify({

        "Name": newLocation.Name,
        "Creator": "Front-End",
        "Latitude": parseFloat(newLocation.Latitude),
        "Longitude": parseFloat(newLocation.Longitude),
        "Address": newLocation.Address,
        "Telephone": newLocation.Telephone,
        "OpeningTime": newLocation.OpeningTime,
        "ClosingTime": newLocation.ClosingTime,
        "IsVerified": false,
        "FK_Category": Number(newLocation.FK_Category),
        "FK_City": Number(newLocation.FK_City)
        }
    )


    /* Form submission handler */
    const handleFormSubmit = async (event) => {
        /* Prevent the form submission from reloading the page */
        event.preventDefault();


        /* post method with a form, CF request.js */
        let newLocationResponse = await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.postLocations}`,
            getAccessTokenSilently,
            loginWithRedirect,
            "POST",
            body
        )
        //let newLocation =  newLocationResponse.toJSON();
        setNewLocation(newLocationResponse);
    };



    return (
        <>
            {/* Render a form allowing to add a new location to the list */}
            <h2>Add a new Location</h2>
            <form onSubmit={handleFormSubmit} className="newLocation-Form">
                {/* All inputs have been replaced with FormInput components */}


                <FormInput
                    /* Link the created ref to the title input */
                    type="text"
                    name="Name"
                    value={newLocation.Name}
                    onChange={handleFormInputChange}
                    placeholder="Name"
                />
                <FormInput
                    type="decimal"
                    name="Latitude"
                    value={newLocation.Latitude}
                    onChange={handleFormInputChange}
                    placeholder="Latitude"
                />
                <FormInput
                    type="decimal"
                    name="Longitude"
                    value={newLocation.Longitude}
                    onChange={handleFormInputChange}
                    placeholder="Longitude"
                />
                <FormInput
                    type="text"
                    name="Address"
                    value={newLocation.Address}
                    onChange={handleFormInputChange}
                    placeholder="Address"
                />


                <FormInput
                    type="text"
                    name="Telephone"
                    value={newLocation.Telephone}
                    onChange={handleFormInputChange}
                    placeholder="Telephone"
                />

                <FormInput
                    type="text"
                    name="OpeningTime"
                    value={newLocation.OpeningTime}
                    onChange={handleFormInputChange}
                    placeholder="Opening time"
                />

                <FormInput
                    type="text"
                    name="ClosingTime"
                    value={newLocation.ClosingTime}
                    onChange={handleFormInputChange}
                    placeholder="Closing Time"
                />


                <FormInput
                    type="number"
                    name="FK_Category"
                    value={newLocation.FK_Category}
                    onChange={handleFormInputChange}
                    placeholder="Category"
                />

                <FormInput
                    type="number"
                    name="FK_City"
                    value={newLocation.FK_City}
                    onChange={handleFormInputChange}
                    placeholder="City"
                />


                <button type="submit">Add Location</button>
            </form>
        </>
    )
}
;


/* FormInput component - uses the object destructuring syntax for the props */
function FormInput({type, name, value, onChange, placeholder, fieldRef}) {
    return (
        /* Wrap both elements in a React Fragment */
        <>
            {/* Render the input with the passed props */}
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                /* fieldRef defaults to null if no ref is given */
                ref={fieldRef ? fieldRef : null}
            />
            {/* Render a line break after the input */}
            <br/>
        </>
    );
}


function App() {
    let [locations, setLocations] = useState([]);

    useEffect(() => {

        let locationsURL = process.env.REACT_APP_SERVER_URL;

        async function getLocations() {
            /* Call the books URL using the fetch API (async) */
            let locationsReponse = await fetch(locationsURL);

            /* Set the books to the JSON body of the response */
            /* using the ".json()" method (async)             */
            setLocations(locationsReponse);
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


    function addLocation (location) {
        setLocations((prevLocations) => [location, ...prevLocations]);
    };


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

    function handleLogout() {
        return (
            <button onClick={() => {
                logout({returnTo: window.location.origin});
            }}>Log out</button>
        );
    };

    function handleLogin() {
        return (
            <button onClick={loginWithRedirect}>Log in</button>
        );
    };

    if (loading) {
        return <Loading/>;
    }

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    {isAuthenticated ? handleLogout() : handleLogin()}
                </div>
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


                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <div className="infos">
                                <div>
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
                                <div>
                                    Telephone : +41 799249044
                                </div>
                            </div>

                            <br/>
                            <Link
                                to="/newLocation"
                            >
                                Add a location
                            </Link>

                            <Route
                                path="/newLocation"
                                /* addLocation is now just a function in a variable */
                                render={() => <LocationForm addLocation={addLocation}/>}
                            />

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
                </BrowserRouter>


            </header>
        </div>
    );
}

export default App;
