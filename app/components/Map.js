import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect, useState } from "react";

// Import required CSS
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createCustomIcon = (color) => {
  return L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const RoutingMachine = ({ pickupCoords, dropoffCoords, setDirections }) => {
  const map = useMap();
  const [routeControl, setRouteControl] = useState(null);

  useEffect(() => {
    if (routeControl) {
      map.removeControl(routeControl);
      setRouteControl(null);
    }

    if (!pickupCoords || !dropoffCoords) {
      setDirections([]);
      return;
    }

    const newRoutingControl = L.Routing.control({
      waypoints: [
        L.latLng(pickupCoords[0], pickupCoords[1]),
        L.latLng(dropoffCoords[0], dropoffCoords[1])
      ],
      routeWhileDragging: false,
      showAlternatives: false,
      addWaypoints: false,
      show: false,
      lineOptions: { 
        styles: [{ color: "#3B82F6", weight: 6, opacity: 0.8 }],
      },
      createMarker: () => null,
    }).addTo(map);

    newRoutingControl.on("routesfound", (e) => {
      const routeInstructions = e.routes[0].instructions.map((step, index) => ({
        id: index + 1,
        text: step.text,
        distance: step.distance,
      }));
      setDirections(routeInstructions);
    });

    setRouteControl(newRoutingControl);

    return () => {
      if (routeControl) {
        map.removeControl(routeControl);
      }
    };
  }, [pickupCoords, dropoffCoords, setDirections, map]);

  return null;
};

const Map = ({ pickupLocation, dropoffLocation, onLocationSelect, setDirections }) => {
  const pickupIcon = createCustomIcon('green');
  const dropoffIcon = createCustomIcon('red');

  useEffect(() => {
    if (!pickupLocation || !dropoffLocation) {
      setDirections([]);
    }
  }, [pickupLocation, dropoffLocation, setDirections]);

  const defaultCenter = [18.5204, 73.8567];

  return (
    <MapContainer 
      center={defaultCenter}
      zoom={13} 
      style={{ height: "100%", width: "100%" }}
      className="rounded-lg"
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {pickupLocation && (
        <Marker 
          position={pickupLocation} 
          icon={pickupIcon}
        >
          <Popup>Pickup Location</Popup>
        </Marker>
      )}

      {dropoffLocation && (
        <Marker 
          position={dropoffLocation} 
          icon={dropoffIcon}
        >
          <Popup>Dropoff Location</Popup>
        </Marker>
      )}

      {pickupLocation && dropoffLocation && (
        <RoutingMachine
          pickupCoords={pickupLocation}
          dropoffCoords={dropoffLocation}
          setDirections={setDirections}
        />
      )}
    </MapContainer>
  );
};

export default Map;
