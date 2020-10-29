import React from 'react';
import {Popup} from 'react-leaflet';

//this componentn open the popup whenver we click on a marker on the map.
const MarkerPopup = (props) => {
  const { ...data } = props.data;


  return  (<Popup>
    <h1 className='popup-text'>{data.name}</h1>
    <h2 className='popup-text'>{data.address}</h2>
    <p className='popup-text'>Telephone : {data.telephone}</p>
    <p className='popup-text'>Opens at : {data.openingTime}</p>
    <p className='popup-text'>Closes at : {data.closingTime}</p>
    <p className='popup-text'>Category : {data.fK_Category}</p>
    <p className='popup-text'>City : {data.fK_City}</p>


    {data.isVerified ?

    <h3 id="verified"> This location has been verified.</h3>
        :
    <h3 id="notVerified"> This location is not verified by our administrators !</h3>
    }

  </Popup>);
};

export default MarkerPopup;
