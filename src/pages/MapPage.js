import React, {useEffect, useState} from "react";
import MapView from "../components/leaflet/MapView";

function MapPage() {
    return (
        <div className="MapPage">
            <MapView />
        </div>
    );
}

export default MapPage;