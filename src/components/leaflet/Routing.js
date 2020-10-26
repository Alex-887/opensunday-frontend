import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";

function Routing (start, end, map){

    let leafletElement = L.control({
        waypoints:[L.latLng(start.latitude, start.longitude), L.latLng(end.latitude, end.longitude)]
    }).addTo(map.leafletElement);

    return leafletElement.getPlan();
}

export default withLeaflet(Routing);