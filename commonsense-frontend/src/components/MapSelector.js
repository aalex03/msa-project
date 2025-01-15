import React from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapSelector = ({ setPosition }) => {
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });

    return null;
  };

  return (
    <MapContainer
      id='map'
      center={[45.760696, 21.226788]} // Default center position set to Timisoara
      zoom={13}
      style={{ width: '60%', minWidth: '600px', display: 'block', margin: '0 auto 2rem auto', height: '400px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapSelector;