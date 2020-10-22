import L from 'leaflet';

/*creates an object for our custom icons for the map*/
export const VenueLocationIcon = L.icon({
  iconUrl: require('../../assets/venue_location_icon.svg'),
  iconRetinaUrl: require('../../assets/venue_location_icon.svg'),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: 'leaflet-venue-icon'
});


export const VenueUserIcon = L.icon({
  iconUrl: require('../../assets/venue_location_icon.svg'),
  iconRetinaUrl: require('../../assets/venue_location_icon.svg'),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [40, 40],
  className: 'leaflet-venue-icon'
});