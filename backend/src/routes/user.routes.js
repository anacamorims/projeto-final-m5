import express from 'express';
import { createUser, getUser, updateUser, deleteUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/api/users', createUser); 
router.get('/api/users/:id', getUser);
router.put('/api/users/:id', updateUser); 
router.delete('/api/users/:id', deleteUser); 

export default router;
