import React, {useRef, useState} from "react";
import "./Location.css";
import request from "../../utils/request";
import endpoints from "../../endpoints.json";
import {useAuth0} from "@auth0/auth0-react";
import {Link} from "react-router-dom";
import Editable from "../Editable/EditableTemplate";
import SocialMediaButtons from "../button/SharingButtons";

export default function Location(props) {

    const inputRef = useRef();
    const [locations, setLocations] = useState(props);


    //auth0 hook
    let {
        loginWithRedirect,
        getAccessTokenSilently,
    } = useAuth0();


    /* Form submission handler */
    const handleEdit = async () => {


        const body = JSON.stringify({
            "Id": Number(locations.id),
            "Name": locations.name,
            "Telephone": locations.telephone,
            "OpeningTime": locations.openingTime,
            "ClosingTime": locations.closingTime,
            }
        )

        let newLocationResponse = await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.putLocations}`,
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