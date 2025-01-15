import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getReports } from '../API/getReports';
import { Link } from 'react-router-dom';

// Custom icon
const customIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', 
    iconSize: [38, 38],  
    iconAnchor: [19, 38],
    popupAnchor: [0, -38] 
});

const MapEvents = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportsData = await getReports();
        setReports(reportsData);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <MapContainer
      id='map'
      center={[45.7489, 21.2087]} // Center position set to Timisoara
      zoom={13}
      style={{ width: '80%', minWidth: '400px', display: 'block', margin: '0 auto 2rem auto', height: '600px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {reports.map((report) => (
        <Marker
          key={report.id}
          position={[report.latitude, report.longitude]}
          icon={customIcon}
        >
          <Popup>
            <strong>{report.title}</strong><br />
            {report.summary}<br />
            <Link to={`/report/${report.id}`}>View Report</Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapEvents;