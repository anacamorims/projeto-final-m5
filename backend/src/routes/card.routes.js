import {authenticateToken}  from '../middleware/authMiddleware.js'; 

const express = require('express');
const CartaoController = require('../controllers/card.controller.js');

const router = express.Router();

//  adicionar novo cartão
router.post('/:usuarioId/cartao', CartaoController.criarCartao);

// buscar cartões de usuário
router.get('/:usuarioId/cartao', CartaoController.buscarCartoes);

module.exports = router;
