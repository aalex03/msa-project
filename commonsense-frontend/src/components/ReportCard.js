import React from 'react';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReportCard = ({ report }) => {
  const { id, title, description, status, type, photos, createdAt, latitude, longitude } = report;

  return (
    <Card style={{ width: '18rem', marginBottom: '1rem' }}>
      {photos && photos.length > 0 ? (
        <Card.Img
          variant="top"
          src={`data:image/jpeg;base64,${photos[0]}`}
          alt="Report Image"
          style={{ objectFit: 'cover', height: '200px' }}
        />
      ) : (
        <Card.Img
          variant="top"
          src="https://via.placeholder.com/150"
          alt="Placeholder Image"
          style={{ objectFit: 'cover', height: '200px' }}
        />
      )}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{type}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <ListGroup className="list-group-flush">
          <ListGroupItem><small className="text-muted">Latitude: {latitude}</small></ListGroupItem>
          <ListGroupItem><small className="text-muted">Longitude: {longitude}</small></ListGroupItem>
        </ListGroup>
        <Link to={`/report/${id}`}>
          <Button variant="primary" style={{ marginTop: '1rem' }}>View Details</Button>
        </Link>
      </Card.Body>
      <Card.Footer className="text-muted">
        <div>{new Date(createdAt).toLocaleDateString()}</div>
        <div>Status: {status || 'Unknown'}</div>
      </Card.Footer>
    </Card>
  );
};

export default ReportCard;