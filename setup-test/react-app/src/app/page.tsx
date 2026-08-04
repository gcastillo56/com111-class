"use client";

import { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';

export default function Home() {
  const [count, setCount] = useState(0);

  const handleProcessClick = () => {
    // Client-side breakpoint: Set a breakpoint on the line below!
    const multiplier = 2;
    const newCount = (count + 1) * multiplier;

    console.log(`Processing complete. New count will be: ${newCount}`);
    setCount(newCount);
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="text-center shadow-sm" style={{ width: '24rem' }}>
        <Card.Body className="p-5">
          <Card.Title as="h1" className="mb-4">
            Next.js Debug Test
          </Card.Title>

          <Card.Text className="fs-5 mb-4">
            Current Count: <strong>{count}</strong>
          </Card.Text>

          <Button
            variant="primary"
            size="lg"
            onClick={handleProcessClick}
          >
            Process & Increment
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}