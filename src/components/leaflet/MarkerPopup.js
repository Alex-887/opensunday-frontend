import React from 'react';
import {Popup} from 'react-leaflet';

//this componentn open the popup whenver we click on a marker on the map.
const MarkerPopup = (props) => {
  const { ...rest } = props.data;

  return  (<Popup>
    <h1 className='popup-text'>{rest.name}</h1>
    <h2 className='popup-text'>{rest.address}</h2>
    <button>delete</button>
  </Popup>);
};

export default MarkerPopup;
