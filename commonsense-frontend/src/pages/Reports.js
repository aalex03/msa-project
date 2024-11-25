import React from 'react';
import ReportCard from '../components/ReportCard';
import { Container, Row, Col } from 'react-bootstrap';

const Reports = ({ reports }) => {
    if (!reports || reports.length === 0) {
        return <p>No reports available.</p>;
    }

    return (
        <Container>
            <Row>
                {reports.map((report, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3}>
                        <ReportCard report={report} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Reports;