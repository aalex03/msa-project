import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { getProfile } from '../API/getProfile';
import { postProfile } from '../API/postProfile';

const Profile = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated) {
        try {
          const profileData = await getProfile(instance);
          console.log(profileData);
          setUsername(profileData.name);
          setProfilePicture(profileData.profilePicture);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };
    fetchProfile();
  }, [isAuthenticated, instance]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postProfile(instance, { username, profilePicture });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1]; // Extract base64 string
      setProfilePicture(base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Profile Setup</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formProfilePicture">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                onChange={handleProfilePictureChange}
              />
              {profilePicture && (
                <img
                  src={`data:image/jpeg;base64,${profilePicture}`}
                  alt="Profile"
                  style={{ width: '100px', height: '100px', marginTop: '10px' }}
                />
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;