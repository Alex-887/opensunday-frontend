import React, {useEffect, useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import {Link} from 'react-router-dom';
import {SidebarData} from './SidebarData';
import './Navbar.css';
import {IconContext} from 'react-icons';
import {useAuth0} from "@auth0/auth0-react";
import {Marker} from "react-leaflet";
import MarkerPopup from "../leaflet/MarkerPopup";
import request from "../../utils/request";
import endpoints from "../../endpoints.json";

function Navbar(props) {
    const [sidebar, setSidebar] = useState(false);
    let {
        loginWithRedirect,
        getAccessTokenSilently,
        isAuthenticated,
        logout,
    } = useAuth0();
    const showSidebar = () => setSidebar(!sidebar);

    function handleLogout() {
        return (
            <BiIcons.BiLogOut class="LogIcon" onClick={() => {
                logout({returnTo: window.location.origin});
            }}/>
        );
    }

    function handleLogin() {
        return (
            <BiIcons.BiLogIn onClick={loginWithRedirect} class="LogIcon"/>
        );
    }

    //icon context to provide the same color to all icons
    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
                <div className='navbar'>

                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar}/>
                    </Link>
                    <header className="App-header">
                        <h1>OpenSunday!</h1>
                    </header>

                    <div className="Login">
                        {isAuthenticated ? handleLogout() : handleLogin()}
                    </div>
                </div>

                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose/>
                            </Link>
                        </li>
                        {isAuthenticated ? SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        }) : <li></li>}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;