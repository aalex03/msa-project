import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel, Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
import { getReportById } from '../API/getReportById';
import { getCommentsForReport } from '../API/getCommentsForReport';
import { getReportUpvotes } from '../API/getReportUpvotes';
import { postUpvote } from '../API/postUpvote';
import { postComment } from '../API/postComment';
import { deleteReport } from '../API/deleteReport';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import CommentList from '../components/CommentList';
import Map from '../components/Map';
import { getUserId, getUserRole } from '../utils';
import { useNavigate } from 'react-router-dom';
const ReportDetail = () => {
  const navigate = useNavigate();
  const { instance } = useMsal();
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [upvotes, setUpvotes] = useState(0);
  const [comments, setComments] = useState([]);
  const isAuthenticated = useIsAuthenticated();
  const userId = getUserId();
  const userRole = getUserRole();
  useEffect(() => {
    const fetchReport = async () => {
      const reportData = await getReportById(id);
      setReport(reportData);
    };
    const fetchUpvotes = async () => {
      const upvotesData = await getReportUpvotes(id);
      setUpvotes(upvotesData);
    };
    fetchReport();
    fetchUpvotes();
  }, [id]);

  const handleUpvote = async () => {
    try {
      await postUpvote(instance, id);
      const upvotesData = await getReportUpvotes(id);
      setUpvotes(upvotesData);
    } catch (error) {
      console.error('Error upvoting report:', error);
    }
  };

  if (!report) {
    return <p>Loading...</p>;
  }

  const handleDeleteReport = async () => {
    try {
      await deleteReport(instance, id);
      navigate("/") 
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  console.log(report.userId);
  const position = [report.latitude, report.longitude];
  return (
    <Container>
      <Row>
        <Col>
          <h1>{report.title}</h1>
          <p>{report.description}</p>
          <p>Status: {report.status}</p>
          <p>Type: {report.type}</p>
          <p>Latitude: {report.latitude}</p>
          <p>Longitude: {report.longitude}</p>
          <p>Created At: {new Date(report.createdAt).toLocaleDateString()}</p>
          <p>Upvotes: {upvotes}</p>
          {isAuthenticated && (
            <Button variant="primary" onClick={handleUpvote}>
              Upvote
            </Button>

          )}
          {isAuthenticated && (report.userId === userId || userRole === 'Admin') && (
            <Button variant="danger" onClick={handleDeleteReport} style={{ marginLeft: '10px' }}>
              Delete
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Carousel>
            {report.photos.map((photo, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={`data:image/jpeg;base64,${photo}`}
                  alt={`Slide ${index}`}
                  style={{ objectFit: 'contain', maxWidth: "400px", margin: "auto", display: "block" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
      <Row>
        <Col>
          <Map position={position} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Comments</h2>
          <CommentList comments={comments} reportId={id} setComments={setComments} />
        </Col>
      </Row>
    </Container>
  );
};

export default ReportDetail;