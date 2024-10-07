import Cartao from '../models/card.model.js';
import Usuario from '../models/card.model.js';

const { Cartao, Usuario } = require('../models');

module.exports = {
  // Criar cartão
  async criarCartao(req, res) {
    try {
      const { usuarioId } = req.params;
      const { numero, vencimento, bandeira, codigo_seg, senha, tipo, limite } = req.body;

      // Verificar se  existe
      const usuario = await Usuario.findByPk(usuarioId);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Criar 
      const novoCartao = await Cartao.create({
        numero,
        vencimento,
        bandeira,
        codigo_seg,
        senha,
        tipo,
        limite,
        usuarioId,
      });

      res.status(201).json(novoCartao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar o cartão' });
    }
  },

  // Buscar cartões usuário
  async buscarCartoes(req, res) {
    try {
      const { usuarioId } = req.params;

      const usuario = await Usuario.findByPk(usuarioId, {
        include: [{
          model: Cartao,
          as: 'cartoes',
        }],
      });

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.status(200).json(usuario.cartoes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar cartões' });
    }
  }
};
