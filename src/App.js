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


function App() {
    let {
        loginWithRedirect,
        getAccessTokenSilently,
        isAuthenticated,
    } = useAuth0();

    const [categories, setCategories] = useState([]);

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
                    <Switch>
                        <Route path='/' exact component={MapPage}/>
                    </Switch>}
            </Router>


        </>
    );
}



export default App;
