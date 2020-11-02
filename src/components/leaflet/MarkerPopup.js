import React, {useState} from 'react';
import {Popup} from 'react-leaflet';
import request from "../../utils/request";
import endpoints from "../../endpoints";
import {useAuth0} from "@auth0/auth0-react";

//this componentn open the popup whenver we click on a marker on the map.
const MarkerPopup = (props) => {
    const {...data} = props.data;
    const [likes, setLikes] = useState([]);

    let {
        loading,
        loginWithRedirect,
        getAccessTokenSilently,
    } = useAuth0();

    //call the method getlikes by location and show amount of likes in popup
    async function getLikes() {
        let likes = await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.getLikesByLocation}/${data.id}`,
            getAccessTokenSilently,
            loginWithRedirect
        );

        if (likes && likes.length > 0) {
            console.log(likes);
            setLikes(likes);
        }
    }

    getLikes();

    const body = JSON.stringify({
            "FK_Location": data.id,
            "isLiked": 1
        }
    )

    const likeClickHandler = async (event) => {
        /* Prevent the form submission from reloading the page */
        event.preventDefault();

        /* post method with a form, CF request.js */
        let newLikeResponse = await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.postLike}`,
            getAccessTokenSilently,
            loginWithRedirect,
            "POST",
            body
        )
        //let newLocation =  newLocationResponse.toJSON();
        console.log(newLikeResponse);
        setLikes([...likes, {
            FK_Location: newLikeResponse.FK_Location,
            FK_User: newLikeResponse.FK_User,
            isLiked: newLikeResponse.isLiked
        }]);
    };

    return (<Popup>
        <h1 className='popup-text'>{data.name}</h1>
        <h2 className='popup-text'>{data.address}</h2>
        <p className='popup-text'>Telephone : {data.telephone}</p>
        <p className='popup-text'>Opens at : {data.openingTime}</p>
        <p className='popup-text'>Closes at : {data.closingTime}</p>
        <p className='popup-text'>Category : {data.fK_Category}</p>
        <p className='popup-text'>City : {data.fK_City}</p>
        <p className='popup-text'>Likes : {likes.length}</p>

        <button
            onClick={likeClickHandler}>A button!
        </button>
    </Popup>);
};

export default MarkerPopup;
