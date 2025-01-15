import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import { postReport } from '../API/postReport';
import MapSelector from '../components/MapSelector';
const AddReport = () => {
  const { instance } = useMsal();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert photos to base64 strings
    const photosBase64 = await Promise.all(Array.from(photos).map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }));

    const reportDTO = {
      title,
      description,
      status,
      type,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      photos: photosBase64,
      createdAt: new Date(),
    };

    try {
      const response = await postReport(instance, reportDTO);
      console.log('Report submitted successfully:', response);
      navigate('/');

    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report');
    }
  };
  return (
    <div className="add-report">
      <h1>Add Report</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formLatitude">
          <Form.Label>Latitude</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formLongitude">
          <Form.Label>Longitude</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPhotos">
          <Form.Label>Photos</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={(e) => setPhotos(e.target.files)}
          />
        </Form.Group>
        <MapSelector setPosition={({ lat, lng }) => {
        setLatitude(lat);
        setLongitude(lng);
      }} />

        <Button variant="primary" type="submit" style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddReport;