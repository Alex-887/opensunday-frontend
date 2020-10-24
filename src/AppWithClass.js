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
//class LocationForm extends React.Component {
    constructor() {
        super();


        this.state = {
            newLocation: this.emptyLocation,
        };


        /* Add a ref for the title text input */
        this.titleInputRef = React.createRef();
    }

    /* Emtpy location used in initial state and for resetting the form */
    emptyLocation = {
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
    };


    /* Form input change handler */
    handleFormInputChange = (event) => {
        /*
        event is the change event generated by the browser
          - event.target is the form input that is affected
          - target.value is the value of the form field
          - target.name is the name of the form field
        */


        const target = event.target;
        const value = target.value;
        const name = target.name;

        /*
        Update state dynamically by spreading the existing
        newLocation object (...prevState.newLocation) and overriding
        the property based on the input name ([name]: value)
        The second form of setState is used, as we are
        basing the new value on the previous state
         */
        this.setState((prevState) => ({
            newLocation: {...prevState.newLocation, [name]: value},
        }));
    };


    /* Form submission handler */
    handleFormSubmit = async (event) => {
        /* Prevent the form submission from reloading the page */
        event.preventDefault();

        let locationsURL = process.env.REACT_APP_SERVER_URL;
        /*  Alex  */
        /* POST method : authorization is the bearer token, we want to generate it with the getAccessTokenSilently */
        let newLocationResponse = await request(`${locationsURL}${endpoints.postLocations}`, localStorage.getItem('token'),localStorage.getItem('redirect'),"POST",
            JSON.stringify({
                "Name": this.state.newLocation.Name,
                "Latitude": parseFloat(this.state.newLocation.Latitude),
                "Longitude": parseFloat(this.state.newLocation.Longitude),
                "Address": this.state.newLocation.Address,
                "Telephone": this.state.newLocation.Telephone,
                "OpeningTime": this.state.newLocation.OpeningTime,
                "ClosingTime": this.state.newLocation.ClosingTime,
                "FK_Category": Number(this.state.newLocation.FK_Category),
                "FK_City": Number(this.state.newLocation.FK_City)
            })
        )

        this.props.addLocation(newLocationResponse);
        this.resetNewLocation();
        this.focusLocationTitle();


    };


    /* Method for focusing on the location title, using the created ref */
    focusLocationTitle = (event) => {
        /* Use "current" to access the DOM element linked to the ref */
        /* and use the browser API method "focus"                    */
        this.titleInputRef.current.focus();
    };

    /* Reset the new location object */
    resetNewLocation = () => {
        this.setState({newLocation: this.emptyLocation});
    };

    render() {
        return (
            <>
                {/* Render a form allowing to add a new location to the list */}
                <h2>Add a new Location</h2>
                <form onSubmit={this.handleFormSubmit} className="newLocation-Form">
                    {/* All inputs have been replaced with FormInput components */}


                    <FormInput
                        /* Link the created ref to the title input */
                        fieldRef={this.titleInputRef}
                        type="text"
                        name="Name"
                        value={this.state.newLocation.Name}
                        onChange={this.handleFormInputChange}
                        placeholder="Name"
                    />
                    <FormInput
                        type="decimal"
                        name="Latitude"
                        value={this.state.newLocation.Latitude}
                        onChange={this.handleFormInputChange}
                        placeholder="Latitude"
                    />
                    <FormInput
                        type="decimal"
                        name="Longitude"
                        value={this.state.newLocation.Longitude}
                        onChange={this.handleFormInputChange}
                        placeholder="Longitude"
                    />
                    <FormInput
                        type="text"
                        name="Address"
                        value={this.state.newLocation.Address}
                        onChange={this.handleFormInputChange}
                        placeholder="Address"
                    />


                    <FormInput
                        type="text"
                        name="Telephone"
                        value={this.state.newLocation.Telephone}
                        onChange={this.handleFormInputChange}
                        placeholder="Telephone"
                    />

                    <FormInput
                        type="text"
                        name="OpeningTime"
                        value={this.state.newLocation.OpeningTime}
                        onChange={this.handleFormInputChange}
                        placeholder="Opening time"
                    />

                    <FormInput
                        type="text"
                        name="ClosingTime"
                        value={this.state.newLocation.ClosingTime}
                        onChange={this.handleFormInputChange}
                        placeholder="Closing Time"
                    />


                    <FormInput
                        type="number"
                        name="FK_Category"
                        value={this.state.newLocation.FK_Category}
                        onChange={this.handleFormInputChange}
                        placeholder="Category"
                    />

                    <FormInput
                        type="number"
                        name="FK_City"
                        value={this.state.newLocation.FK_City}
                        onChange={this.handleFormInputChange}
                        placeholder="City"
                    />


                    <button type="submit">Add Location</button>
                </form>
            </>
        );
    }
}


/* FormInput component - uses the object destructuring syntax for the props */
//function FormInput({type, name, value, onChange, placeholder, fieldRef}) {
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


//function App() {
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

    localStorage.setItem('redirect', loginWithRedirect);

    let addLocation = (location) => {
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

    function handleLogout(){
        return (
            <button onClick={() => {
                logout({returnTo: window.location.origin});
            }}>Log out</button>
        );
    };

    function handleLogin(){
        return (
            <button onClick={loginWithRedirect}>Log in</button>
        );
    };

    if(isAuthenticated){
        localStorage.setItem('token', getAccessTokenSilently);
    }
    if (loading) {
        return <Loading/>;
    }

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    {isAuthenticated ? handleLogout() :handleLogin() }
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

//export default App;
