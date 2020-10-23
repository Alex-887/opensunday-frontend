import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

//Logout a logged user
function LogoutButton() {
    const {
        isAuthenticated,
        logout,
    } = useAuth0();

    return isAuthenticated && (
        <button onClick={() => {
            logout({ returnTo: window.location.origin });
        }}>Log out</button>
    );
}

export default LogoutButton;