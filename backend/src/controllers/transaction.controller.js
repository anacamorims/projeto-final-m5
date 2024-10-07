import Transaction from '../models/transaction.model.js';
import User from '../models/user.model.js';
import History from '../models/history.model.js';

export const createTransaction = async (req, res) => {
    try {
        const { senderAccountNumber, receiverAccountNumber, amount, description } = req.body;

        const sender = await User.findOne({ where: { accountNumber: senderAccountNumber } });
        if (!sender) {
            return res.status(404).json({ message: 'Usuário remetente não encontrado' });
        }

        const receiver = await User.findOne({ where: { accountNumber: receiverAccountNumber } });
        if (!receiver) {
            return res.status(404).json({ message: 'Usuário destinatário não encontrado' });
        }

        if (sender.balance < amount) {
            return res.status(400).json({ message: 'Saldo insuficiente' });
        }

        sender.balance -= amount;
        receiver.balance += amount;

        await sender.save();
        await receiver.save();

        const transaction = await Transaction.create({
            senderId: sender.accountNumber,
            receiverId: receiver.accountNumber,
            amount,
            type: 'transfer',
            description
        });


        await History.create({
          userId: sender.id, 
          transactionId: transaction.id, 
          action: 'transfer', 
          amount: -amount,
          description: `Enviou R$${amount} para ${receiver.name}: ${description}`,
      });

      await History.create({
          userId: receiver.id,
          transactionId: transaction.id,
          action: 'transfer', 
          amount, 
          description: `Recebeu R$${amount} de ${sender.name}: ${description}`,
      });

        return res.status(201).json({ message: 'Transação realizada com sucesso', transaction });
    } catch (error) {
        console.error("Erro ao criar a transação:", error); 
        return res.status(500).json({ message: 'Erro ao criar a transação', error: error.message });
    }
};
  
export const getUserHistory = async (req, res) => {
  const { userId } = req.params; 
  try {
      const history = await History.findAll({
          where: { userId },
          order: [['createdAt', 'DESC']],
      });
      return res.json(history);
  } catch (error) {
      return res.status(500).json({ message: 'Erro ao obter histórico', error: error.message });
  }
};