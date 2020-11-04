import React, {useEffect, useState} from 'react';
import {Popup} from 'react-leaflet';
import request from "../../utils/request";
import endpoints from "../../endpoints";
import {useAuth0} from "@auth0/auth0-react";
import Location from "../location/Location";

//this componentn open the popup whenver we click on a marker on the map.
const MarkerPopup = (props) => {
    const {...data} = props.data;
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState([]);

    let {
        loading,
        loginWithRedirect,
        getAccessTokenSilently,
    } = useAuth0();

    useEffect(() => {
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
    }, []);

    useEffect(() => {
        //call the method getlikes by location and show amount of likes in popup
        async function isLiked() {
            let like = await request(
                `${process.env.REACT_APP_SERVER_URL}${endpoints.user}/${data.id}`,
                getAccessTokenSilently,
                loginWithRedirect
            );

            if (typeof like !== 'undefined') {
                console.log(like);
                setLiked(true);
            }
        }
        isLiked();
    }, []);

    const likeClickHandler = async (event) => {
        /* Prevent the form submission from reloading the page */
        event.preventDefault();

        const body = JSON.stringify({
                "FK_Location": data.id,
                "isLiked": 1
            }
        )

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
        setLiked(true);
    };

    const dislikeClickHandler = async (event) => {
        /* Prevent the form submission from reloading the page */
        event.preventDefault();

        /* post method with a form, CF request.js */
        let newLikeResponse = await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.user}/${data.id}`,
            getAccessTokenSilently,
            loginWithRedirect,
            "DELETE"
        )
        //rm like from likes list state hook
        if(newLikeResponse){
            const newList = likes.splice(likes.indexOf(data.id), 1);
            //let newLocation =  newLocationResponse.toJSON();
            console.log( "Location " + data.id + "Like-Removed = " + newLikeResponse);
            setLikes([...newList]);
            setLiked(false);
        }

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
        {liked ? <button onClick={dislikeClickHandler}>Dislike</button> : <button
            onClick={likeClickHandler}>Like</button>}
    </Popup>);
};

export default MarkerPopup;