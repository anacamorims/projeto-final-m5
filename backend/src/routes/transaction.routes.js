// src/routes/transaction.routes.js
import express from 'express';
import { createTransaction, getTransactions } from '../controllers/transaction.controller.js';
import {authenticateToken}  from '../middleware/authMiddleware.js'; // Altere o caminho conforme necessário

const router = express.Router();

router.post('/api/transactions', authenticateToken, createTransaction); // Adicionando o middleware aqui

router.get('/api/transactions/:userId', getTransactions);

export default router;
