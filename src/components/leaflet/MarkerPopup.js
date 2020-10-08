import React from 'react';
import {Popup} from 'react-leaflet';

//this componentn open the popup whenver we click on a marker on the map.
const MarkerPopup = (props) => {
  const { name } = props.data;
  console.log(name);

  return  (<Popup>
    <div className='popup-text'>{name}</div>
  </Popup>);
};

export default MarkerPopup;
