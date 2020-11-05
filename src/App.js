import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import Navbar from "./components/SideBar/Navbar";
import AddLocation from './pages/AddLocation'
import MapPage from './pages/MapPage'
import LocationsDetails from "./pages/LocationsDetails";
import Preferences from "./pages/Preferences";
import {useAuth0} from "@auth0/auth0-react";
import request from "./utils/request";
import endpoints from "./endpoints.json";
import Alert from "react-bootstrap/Alert";
import Button from "@material-ui/core/Button";
import * as BiIcons from "react-icons/bi";

function App() {

    let {
        loginWithRedirect,
        getAccessTokenSilently,
        isAuthenticated,
    } = useAuth0();

    const [categories, setCategories] = useState([]);
    const [show, setShow] = useState(true);

    useEffect(() => {
        //call the method getlikes by location and show amount of likes in popup
        async function getCategories() {
            let categories = await request(
                `${process.env.REACT_APP_SERVER_URL}${endpoints.categories}`,
                getAccessTokenSilently,
                loginWithRedirect,
                "GET",
            );

            if (categories && categories.length > 0) {
                console.log(categories);
                setCategories(categories);
            }
        }

        getCategories();
    }, []);

    const handleAlert = async (event) => {
        /* Prevent the form submission from reloading the page */
        event.preventDefault();
        setShow(false);
        await loginWithRedirect();
    };


    return (
        <>
            <Router>
                <Navbar categories={categories}/>
                {isAuthenticated ?
                    <Switch>
                    <Route path='/' exact component={MapPage}/>
                    <Route path='/AddLocation' exact component={AddLocation}/>
                    <Route path='/LocationsDetails' exact component={LocationsDetails}/>
                    <Route path='/Preferences' exact component={Preferences}/>
                </Switch>:
                    <>
                    <Switch>
                    <Route path='/' exact component={MapPage}/>
                    </Switch>
                    <Alert show={show} variant="success">
                        <Alert.Heading>Welcome at OpenSunday!</Alert.Heading>
                        <p>
                            Please Login to use our funcionalities!
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={handleAlert} variant="outline-success">
                                go to Login!
                            </Button>
                        </div>
                    </Alert>
                    </>}
            </Router>


        </>
    );
}



export default App;
