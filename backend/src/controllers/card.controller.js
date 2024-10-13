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

      // Validação dos campos
      if (!vencimento || !bandeira || !senha || !tipo || limite === undefined) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

      const numero = gerarNumeroCartao(); 
      const codigo_seg = gerarCodigoSeguranca(); 

      const usuario = await User.findByPk(id);
  
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      const novoCartao = await Cartao.create({
        numero,
        vencimento,
        bandeira,
        codigo_seg,
        senha,
        tipo,
        limite,
        usuarioId: usuario.id, 
      });
  
      res.status(201).json(novoCartao);
    } catch (error) {
      console.error('Erro ao adicionar o cartão:', error);
      res.status(500).json({ error: 'Erro ao adicionar o cartão' });
    }
  },

  async buscarCartoes(req, res) {
    try {
      const { id } = req.params;

      const usuario = await User.findByPk(id, {
        include: [{
          model: Cartao,
          as: 'cartoes', // Certifique-se de que o alias corresponde à associação no modelo
        }],
      });

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Verifica se o usuário possui cartões
      if (!usuario.cartoes || usuario.cartoes.length === 0) {
        return res.status(200).json([{ 
          numero: 'XXXX XXXX XXXX XXXX',
          vencimento: 'XX/XX',
          bandeira: 'Nenhuma',
          tipo: 'Nenhum',
        }]);
      }

      res.status(200).json(usuario.cartoes);
    } catch (error) {
      console.error('Erro ao buscar cartões:', error);
      res.status(500).json({ error: 'Erro ao buscar cartões' });
    }
  }
};

// Exportando as funções
export const { criarCartao, buscarCartoes } = cardController;
