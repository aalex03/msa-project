import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', 
  iconSize: [38, 38], 
  iconAnchor: [19, 38], 
  popupAnchor: [0, -38] 
  });

const Map = ({position}) => {
    
  return (
    <MapContainer id='map' center={position} zoom={13} style={{ width: '60%', display: 'block', margin: '0 auto 2rem auto', height: '400px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={customIcon}>
      </Marker>
    </MapContainer>
  );
};

export default Map;