import Transaction from '../models/transaction.model.js';
import User from '../models/user.model.js';

export const createTransaction = async (req, res) => {
    try {
        const { senderAccountNumber, receiverAccountNumber, amount } = req.body;

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
            type: 'transfer'
        });

        return res.status(201).json({ message: 'Transação realizada com sucesso', transaction });
    } catch (error) {
        console.error("Erro ao criar a transação:", error); 
        return res.status(500).json({ message: 'Erro ao criar a transação', error: error.message });
    }
};
  
export const getTransactions = async (req, res) => {
  const { userId } = req.params;
  try {
    const transactions = await Transaction.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving transactions', error: error.message });
  }
};
