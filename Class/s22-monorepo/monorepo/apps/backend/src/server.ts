// apps/backend/src/server.ts
import express from 'express';
import cors from 'cors';
import type { ApiHealthResponse } from '@repo/shared';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  const payload: ApiHealthResponse = {
    status: 'ok',
    timestamp: new Date().toISOString()
  };
  res.json(payload);
});

app.listen(PORT, () => {
  console.log(`Express API listening on http://localhost:${PORT}`);
});