import { AppError } from '../utils/appError.js';

// TODO: Implement 'protect' middleware
// 1. Extract 'authorization' header from req.headers
// 2. Check if header exists and starts with 'Bearer '
// 3. Extract token string
// 4. Validate token:
//    - If token === 'sustain-user-token', attach req.user = { id: 101, name: 'Elena', role: 'user' }
//    - If token === 'sustain-admin-token', attach req.user = { id: 999, name: 'Prof. Gabriel', role: 'admin' }
//    - Otherwise, pass next(new AppError('Unauthorized: Invalid or missing token', 401))
export const protect = (req, res, next) => {
    // WRITE YOUR PROTECTION LOGIC HERE
    next();
};

// TODO: Implement 'requireAdmin' middleware
// 1. Verify if req.user exists and req.user.role === 'admin'
// 2. If true, call next()
// 3. Otherwise, pass next(new AppError('Forbidden: Admin privilege required for this action', 403))
export const requireAdmin = (req, res, next) => {
    // WRITE YOUR ADMIN CHECK LOGIC HERE
    next();
};
