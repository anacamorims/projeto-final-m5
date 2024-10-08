import express from 'express';
import { createUser, getUser, updateUser, deleteUser, loginUser } from '../controllers/user.controller.js';
import { authenticateToken } from '../middleware/authMiddleware.js'; 
const router = express.Router();

router.post('/api/users', createUser);
router.post('/api/login', loginUser); 
router.get('/api/users/:id', authenticateToken, getUser); 
router.put('/api/users/:id', authenticateToken, updateUser); 
router.delete('/api/users/:id', authenticateToken, deleteUser);

export default router;
