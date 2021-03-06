import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import request from "../utils/request";
import endpoints from "../endpoints.json";
import {Link} from "react-router-dom";

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
            CategoryName: '',
            NPA: '',
            CityName: ''
        });

    const [categories, setCategories] = useState([]);

    let {
        loginWithRedirect,
        getAccessTokenSilently,
    } = useAuth0();

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

    /* Form submission handler */
    const handleFormSubmit = async (event) => {
        /* Prevent the form submission from reloading the page */
        event.preventDefault();

        const body = JSON.stringify({
                "Name": newLocation.Name,
                "Creator": "Front-End",
                "Latitude": parseFloat(newLocation.Latitude),
                "Longitude": parseFloat(newLocation.Longitude),
                "Address": newLocation.Address,
                "Telephone": newLocation.Telephone,
                "OpeningTime": newLocation.OpeningTime,
                "ClosingTime": newLocation.ClosingTime,
                "CategoryName": newLocation.CategoryName,
                "CityName": newLocation.CityName,
                "NPA": Number(newLocation.NPA)
            }
        )

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
            <h1 className="newLocation-Form">Add a new Location</h1>
            <form onSubmit={handleFormSubmit} className="newLocation-Form">
                <FormInput
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
                    type="text"
                    name="CategoryName"
                    value={newLocation.CategoryName}
                    onChange={handleFormInputChange}
                    placeholder="Category"
                />
                <FormInput
                    type="text"
                    name="CityName"
                    value={newLocation.CityName}
                    onChange={handleFormInputChange}
                    placeholder="City"
                />
                <FormInput
                    type="number"
                    name="NPA"
                    value={newLocation.NPA}
                    onChange={handleFormInputChange}
                    placeholder="NPA"
                />

                    <button type="submit">Add Location</button>

            </form>
        </>
    )
}


/* FormInput component - uses the object destructuring syntax for the props */
function FormInput({type, name, value, onChange, placeholder, fieldRef}) {
    return (
        <>
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                ref={fieldRef ? fieldRef : null}
                required />
            <br/>
        </>
    );
}


function AddLocation() {


    const [locations, setLocations] = useState([]);


    function addLocation(location) {
        setLocations((prevLocations) => [location, ...prevLocations]);
    }


    return (
        <div className="LocationsManagement">

            <LocationForm addLocation={addLocation}/>

        </div>
    );

}


export default AddLocation;