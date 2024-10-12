import express from 'express';
import { criarCartao, buscarCartoes } from '../controllers/card.controller.js';

const router = express.Router();

// Rota para criar um cartão (aqui o ID é um parâmetro da URL)
router.post('/:id/card', criarCartao);
router.get('/:id/card', buscarCartoes);

export default router;
