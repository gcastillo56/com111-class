import express from 'express';
import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import { AppError } from './utils/appError.js';

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());

// TODO: Serve static files from the 'public' directory so index.html loads on http://localhost:3000
app.use(express.static('public'));

// TODO: Mount Routers
// Mount authRoutes on '/api/auth'
// Mount apiRoutes on '/api/'

// 404 Unhandled Route Handler
app.all("/{*splat}", (req, res, next) => {
    next(new AppError(`Cannot find route ${req.originalUrl} on this server!`, 404));
});

// Centralized Global Error Handler
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`🚀 SustainHub Server running at http://localhost:${PORT}`);
});
