import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect, useRef } from "react";
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

const createVehicleIcon = () => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div style="
        background: #4CAF50;
        border-radius: 50%;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      ">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M19 12c0 1.1-.9 2-2 2h-1v2c0 .55-.45 1-1 1s-1-.45-1-1v-2H9v2c0 .55-.45 1-1 1s-1-.45-1-1v-2H6c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h11c1.1 0 2 .9 2 2v6z"/>
        </svg>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });
};

const RoutingMachine = ({ stops, setDirections }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
      routingControlRef.current = null;
    }

    const validStops = Array.isArray(stops) ? stops.filter(stop => stop.coordinates && stop.address?.trim()) : [];

    if (validStops.length < 2) {
      setDirections?.([]);
      return;
    }

    const waypoints = validStops.map(stop => L.latLng(stop.coordinates[0], stop.coordinates[1]));

    const routingControl = L.Routing.control({
      waypoints,
      routeWhileDragging: false,
      showAlternatives: false,
      addWaypoints: false,
      show: false,
      lineOptions: {
        styles: [{ color: "#3B82F6", weight: 6, opacity: 0.8 }],
      },
      createMarker: () => null,
    });

    routingControl.addTo(map);
    routingControlRef.current = routingControl;

    if (waypoints.length > 0) {
      const bounds = L.latLngBounds(waypoints);
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    routingControl.on('routesfound', (e) => {
      const container = document.querySelector('.leaflet-routing-container');
      if (container) container.style.display = 'none';
      
      const routeInstructions = e.routes[0].instructions.map((step, index) => ({
        id: index + 1,
        text: step.text,
        distance: step.distance,
      }));
      setDirections?.(routeInstructions);
    });

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [stops, map, setDirections]);

  return null;
};

const DynamicMap = ({ stops, setDirections, showVehicle = false, theme}) => {
  const getMarkerColor = (index, total) => {
    if (index === 0) return 'green';
    if (index === total - 1) return 'red';
    return 'blue';
  };

  const defaultCenter = [18.5204, 73.8567];
  const validStops = Array.isArray(stops) ? stops.filter(stop => stop.coordinates && stop.address?.trim()) : [];


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

      {validStops.map((stop, index) => (
        <Marker 
          key={`${stop.id}-${stop.address}`}
          position={stop.coordinates} 
          icon={createCustomIcon(getMarkerColor(index, validStops.length))}
        >
          <Popup>
            {index === 0 ? "Pickup Location" : 
             index === validStops.length - 1 ? "Dropoff Location" : 
             `Stop ${index}`}
          </Popup>
        </Marker>
      ))}

      {showVehicle && validStops.length > 0 && (
        <Marker
          position={validStops[0].coordinates}
          icon={createVehicleIcon()}
        >
          <Popup>Driver's Location</Popup>
        </Marker>
      )}

<RoutingMachine 
        stops={stops} 
        setDirections={setDirections}
        theme={theme}
      />
    </MapContainer>
  );
};

export default DynamicMap;