import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import Navbar from "./components/SideBar/Navbar";
import AddLocation from './pages/AddLocation'
import MapPage from './pages/MapPage'
import LocationsDetails from "./pages/LocationsDetails";
import Preferences from "./pages/Preferences";


function App() {

    //check if user is logged otherwise ask to log in

    return (
        <>
            <Router>
                <Navbar/>
                <Switch>
                    <Route path='/' exact component={MapPage}/>
                    <Route path='/AddLocation' exact component={AddLocation}/>
                    <Route path='/LocationsDetails' exact component={LocationsDetails}/>
                    <Route path='/Preferences' exact component={Preferences}/>
                </Switch>
            </Router>
        </>
    );
}

export default App;
