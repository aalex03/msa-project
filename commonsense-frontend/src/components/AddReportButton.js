import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddReportButton = () => {
  const navigate = useNavigate();

  const handleAddReport = () => {
    navigate('/add-report');
  };

  return (
    <Button variant="primary" onClick={handleAddReport} style={{ marginTop: '1rem' }}>
      Add Report
    </Button>
  );
};

export default AddReportButton;