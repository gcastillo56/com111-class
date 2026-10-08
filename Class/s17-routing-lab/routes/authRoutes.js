import express from 'express';
import { AppError } from '../utils/appError.js';

const router = express.Router();

router.post('/login', (req, res, next) => {
    const { role } = req.body;

    if (role === 'admin') {
        return res.json({
            status: 'success',
            message: 'Logged in as Administrator',
            token: 'sustain-admin-token',
            user: { name: 'Prof. Gabriel', role: 'admin' }
        });
    } else if (role === 'user') {
        return res.json({
            status: 'success',
            message: 'Logged in as Researcher',
            token: 'sustain-user-token',
            user: { name: 'Elena', role: 'user' }
        });
    }

    next(new AppError('Invalid login role specified. Use "user" or "admin".', 400));
});

export default router;
