// src/routes/transaction.routes.js
import express from 'express';
import { createTransaction } from '../controllers/transaction.controller.js';
import {authenticateToken}  from '../middleware/authMiddleware.js'; // Altere o caminho conforme necessário

const router = express.Router();

router.post('/api/transactions', authenticateToken, createTransaction); 

export default router;
