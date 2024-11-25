const ReportCard = ({ report }) => {
    const { Title, Photos, CreatedAt, Status } = report;

    return (
        <Card style={{ width: '18rem', margin: '1rem' }}>
            {/* Title */}
            <Card.Body>
                <Card.Title>{Title}</Card.Title>

                {/* Photo */}
                {Photos && Photos.length > 0 ? (
                    <Card.Img 
                        variant="top" 
                        src={`data:image/jpeg;base64,${Photos[0].toString('base64')}`} 
                        alt="Report Photo" 
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
            </Card.Body>

            {/* Footer */}
            <Card.Footer className="text-muted">
                <div>{new Date(CreatedAt).toLocaleDateString()}</div>
                <div>Status: {Status || 'Unknown'}</div>
            </Card.Footer>
        </Card>
    );
};