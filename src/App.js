import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import Navbar from "./components/SideBar/Navbar";
import LocationsManagement from './pages/LocationsManagement'
import MapPage from './pages/MapPage'


function App() {

    return (
        <>
            <Router>
                <Navbar/>
                <Switch>
                    <Route path='/' exact component={MapPage}/>
                    <Route path='/LocationsManagement' exact component={LocationsManagement}/>
                </Switch>
            </Router>
        </>
    );
}

export default App;
