"use client";

import { useState } from 'react';
import { Container, Card, Button, Spinner } from 'react-bootstrap';

export default function Home() {
  const [data, setData] = useState<{ name: string; value: string; dbStatus: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetchData = async () => {
    setLoading(true);
    try {
      // FRONTEND BREAKPOINT: Set a red dot on the line below!
      const response = await fetch('http://localhost:5000/api/data');
      const result = await response.json();

      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Error fetching from Express:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="text-center shadow-sm" style={{ width: '28rem' }}>
        <Card.Body className="p-5">
          <Card.Title as="h2" className="mb-4 text-primary">
            Full Stack Debug Test
          </Card.Title>

          {data ? (
            <div className="mb-4 text-start bg-light p-3 rounded border">
              <p className="mb-1"><strong>Item:</strong> {data.name}</p>
              <p className="mb-1"><strong>Value:</strong> {data.value}</p>
              <p className="mb-0 text-muted small"><strong>DB:</strong> {data.dbStatus}</p>
            </div>
          ) : (
            <p className="text-muted mb-4">No data fetched yet.</p>
          )}

          <Button
            variant="primary"
            size="lg"
            onClick={handleFetchData}
            disabled={loading}
          >
            {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Fetch API Data'}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}