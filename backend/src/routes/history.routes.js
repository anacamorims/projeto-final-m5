import express from 'express';
import { getUserHistory } from '../controllers/transaction.controller.js';

const router = express.Router();

router.get('/history/:userId', getUserHistory);

export default router;
