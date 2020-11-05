import React, {useRef, useState} from "react";
import "./Location.css";
import request from "../../utils/request";
import endpoints from "../../endpoints.json";
import {useAuth0} from "@auth0/auth0-react";
import {Link} from "react-router-dom";
import Editable from "../Editable/EditableTemplate";

export default function Location(props) {

    const inputRef = useRef();
    const [locations, setLocations] = useState(props);


    //auth0 hook
    let {
        loginWithRedirect,
        getAccessTokenSilently,
    } = useAuth0();


    const body = JSON.stringify({
            "Id": Number(locations.id),
            "Name": locations.name,
            "Creator": locations.creator,
            "Latitude": parseFloat(locations.latitude),
            "Longitude": parseFloat(locations.longitude),
            "Address": locations.address,
            "Telephone": locations.telephone,
            "OpeningTime": locations.openingTime,
            "ClosingTime": locations.closingTime,
            "FK_City": Number(locations.fK_City),
            "FK_Category": Number(locations.fK_Category)

        }
    )


    /* Form submission handler */
    const handleEdit = async () => {


        let newLocationResponse = await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.putLocations}/${locations.id}`,
            getAccessTokenSilently,
            loginWithRedirect,
            "PUT",
            body
        )
        setLocations(newLocationResponse);
    };


//delete method
    const handleDelete = async locationId => {
        await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.deleteLocations}/${locationId}`,
            getAccessTokenSilently,
            loginWithRedirect,
            "DELETE"
        )
    }

//change on modify
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setLocations(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    return (
        <div className="location">


            <table className="TableLocation">
                <tr>
                    <td>Location name :</td>
                    <td>
                        <Editable
                            text={locations.name}
                            placeholder="Write a location name"
                            type="input"
                            childRef={inputRef}>
                            <input
                                type="text"
                                name="name"
                                ref={inputRef}
                                placeholder="Location name"
                                value={locations.name}
                                onChange={handleInputChange}
                            />
                        </Editable>
                    </td>
                </tr>


                <tr>
                    <td>Address :</td>
                    <td>
                        <Editable
                            text={locations.address}
                            placeholder="Write an address"
                            type="input"
                            childRef={inputRef}>
                            <input
                                type="text"
                                name="address"
                                ref={inputRef}
                                placeholder="Address"
                                value={locations.address}
                                onChange={handleInputChange}
                            />
                        </Editable>
                    </td>
                </tr>


                <tr>
                    <td>Telephone :</td>
                    <td>
                        <Editable
                            text={locations.telephone}
                            placeholder="Write a telephone number"
                            type="input"
                            childRef={inputRef}>
                            <input
                                type="text"
                                name="telephone"
                                ref={inputRef}
                                placeholder="Telephone number"
                                value={locations.telephone}
                                onChange={handleInputChange}
                            />
                        </Editable>
                    </td>
                </tr>


                <tr>
                    <td>Opening time :</td>
                    <td>
                        <Editable
                            text={locations.openingTime}
                            placeholder="Write the opening time"
                            type="input"
                            childRef={inputRef}>

                            <input
                                type="text"
                                name="openingTime"
                                ref={inputRef}
                                placeholder="Opening time"
                                value={locations.openingTime}
                                onChange={handleInputChange}
                            />
                        </Editable>
                    </td>
                </tr>

                <tr>
                    <td>Closing time :</td>
                    <td>
                        <Editable
                            text={locations.closingTime}
                            placeholder="Write the closing time"
                            type="input"
                            childRef={inputRef}>

                            <input
                                type="text"
                                name="closingTime"
                                ref={inputRef}
                                placeholder="Closing time"
                                value={locations.closingTime}
                                onChange={handleInputChange}
                            />
                        </Editable>
                    </td>
                </tr>


                <tr>
                    <td>Category name :</td>
                    <td>
                        <Editable
                            text={locations.categoryName}
                            placeholder="Write the category"
                            type="input"
                            childRef={inputRef}>

                            <input
                                type="text"
                                name="categoryName"
                                ref={inputRef}
                                placeholder="Category name"
                                value={locations.categoryName}
                                onChange={handleInputChange}
                            />
                        </Editable>
                    </td>
                </tr>


                <tr>
                    <td>NPA :</td>
                    <td>
                        <Editable
                            text={locations.fK_City}
                            placeholder="Write the NPA"
                            type="input"
                            childRef={inputRef}>

                            <input
                                type="number"
                                name="fK_City"
                                ref={inputRef}
                                placeholder="NPA"
                                value={locations.fK_City}
                                onChange={handleInputChange}
                            />
                        </Editable>
                    </td>
                </tr>

                <tr>
                    <td>City name :</td>
                    <td>
                        <Editable
                            text={locations.cityName}
                            placeholder="Write the city"
                            type="input"
                            childRef={inputRef}>

                            <input
                                type="text"
                                name="cityName"
                                ref={inputRef}
                                placeholder="City name"
                                value={locations.cityName}
                                onChange={handleInputChange}
                            />
                        </Editable>
                    </td>
                </tr>

                <tr>
                    <td>Latitude :</td>
                    <td>
                        <Editable
                            text={locations.latitude}
                            placeholder="Write the latitude"
                            type="input"
                            childRef={inputRef}>

                            <input
                                type="decimal"
                                name="latitude"
                                ref={inputRef}
                                placeholder="Latitude"
                                value={locations.latitude}
                                onChange={handleInputChange}
                            />
                        </Editable>
                    </td>
                </tr>

                <tr>
                    <td>Longitude :</td>
                    <td>
                        <Editable
                            text={locations.longitude}
                            placeholder="Write the longitude"
                            type="input"
                            childRef={inputRef}>

                            <input
                                type="decimal"
                                name="Longitude"
                                ref={inputRef}
                                placeholder="Longitude"
                                value={locations.longitude}
                                onChange={handleInputChange}
                            />
                        </Editable>
                    </td>
                </tr>


            </table>

            <Link to="/LocationsDetails">
                <button type="submit" onClick={() => handleEdit(locations.id)}>Edit</button>
            </Link>
            <br/>
            <Link to="/LocationsDetails">
                <button type="submit" onClick={() => handleDelete(locations.id)}>Delete</button>
            </Link>
        </div>
    );
}