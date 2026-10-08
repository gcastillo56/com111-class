import express from 'express';
import { protect, requireAdmin } from '../middlewares/authMiddleware.js';
import { AppError } from '../utils/appError.js';

const router = express.Router();

// Simulated In-Memory Database
let initiatives = [
    { id: 1, title: 'Solar Canopy Expansion', priority: 'High', status: 'Active' },
    { id: 2, title: 'Campus Composting Loop', priority: 'Medium', status: 'In Review' }
];

// TODO: Use router.route('/') with METHOD CHAINING
// Chain .get() -> protected, returns all initiatives
// Chain .post() -> protected, validates body title & priority, creates & returns new initiative (201)
router.route('/')
    .get(/* TODO: Add protect & handler */)
    .post(/* TODO: Add protect & handler */);

// TODO: Use router.route('/:id') with METHOD CHAINING
// Chain .get() -> protected, returns single initiative or 404
// Chain .delete() -> protected + requireAdmin, deletes initiative by ID or 404
router.route('/:id')
    .get(/* TODO: Add protect & handler */)
    .delete(/* TODO: Add protect + requireAdmin & handler */);

export default router;
