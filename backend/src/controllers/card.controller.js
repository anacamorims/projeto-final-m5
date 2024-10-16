import Cartao from '../models/card.model.js';
import User from '../models/user.model.js';

const gerarNumeroCartao = () => {
  let numero = '';
  for (let i = 0; i < 16; i++) {
    numero += Math.floor(Math.random() * 10);  
  }
  return numero;
};

const gerarCodigoSeguranca = () => {
  let codigo = '';
  for (let i = 0; i < 3; i++) {
    codigo += Math.floor(Math.random() * 10); 
  }
  return codigo;
};

const cardController = {
  async criarCartao(req, res) {
    try {
      const { id } = req.params; 
      const { vencimento, bandeira, senha, tipo, limite } = req.body;

      const numero = gerarNumeroCartao(); 
      const codigo_seg = gerarCodigoSeguranca(); 

      const dataAtual = new Date();
      const anoValidade = dataAtual.getFullYear() + 3; // Adiciona 3 anos
      const mesValidade = dataAtual.getMonth() + 1; // Mês atual (0-11, então +1)
      const dataVencimento = `${mesValidade < 10 ? '0' : ''}${mesValidade}/${anoValidade.toString().slice(-2)}`; // Formato MM/AA

  
      const usuario = await User.findByPk(id);
  
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      const novoCartao = await Cartao.create({
        numero,
        vencimento: dataVencimento,
        bandeira,
        codigo_seg,
        senha,
        tipo,
        limite,
        usuarioId: usuario.id, // Usa o ID do usuário
      });
  
      res.status(201).json(novoCartao);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao adicionar o cartão' });
    }
  },

  async buscarCartoes(req, res) {
    try {
      const { id } = req.params;
  
      // Verifica se o usuário existe
      const usuario = await User.findByPk(id);
  
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      // Busca os cartões do usuário
      const cartoes = await Cartao.findAll({
        where: { usuarioId: usuario.id }, // Filtra os cartões pelo ID do usuário
      });
  
      // Verifica se o usuário não possui cartões
      if (cartoes.length === 0) {
        return res.status(404).json({ error: 'Nenhum cartão encontrado para este usuário' });
      }
  
      res.status(200).json(cartoes);
    } catch (error) {
      console.error('Erro ao buscar cartões:', error); // Log do erro
      res.status(500).json({ error: 'Erro ao buscar cartões' });
    }
  }
  
};

// Exportando as funções
export const { criarCartao, buscarCartoes } = cardController;
