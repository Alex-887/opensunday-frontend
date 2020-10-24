import React from 'react';
import {Popup} from 'react-leaflet';

//this componentn open the popup whenver we click on a marker on the map.
const UserMarkerPopup = () => {

  return  (<Popup>
    <div className='popup-text'>{"Hey it's me!"}</div>
  </Popup>);
};

export default UserMarkerPopup;
