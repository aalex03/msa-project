import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { getLeaderboard } from '../API/getLeaderboard';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const leaderboardData = await getLeaderboard();
        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Leaderboard</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <tr key={user.userId}>
                  <td>{index + 1}</td>
                  <td>{user.userName}</td>
                  <td>{user.points}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Leaderboard;