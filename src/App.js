import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import Navbar from "./components/SideBar/Navbar";
import AddLocation from './pages/AddLocation'
import MapPage from './pages/MapPage'
import LocationsDetails from "./pages/LocationsDetails";
import Preferences from "./pages/Preferences";
import {useAuth0} from "@auth0/auth0-react";


function App() {
    let {
        isAuthenticated,
    } = useAuth0();

    return (
        <>
            <Router>
                <Navbar/>
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
