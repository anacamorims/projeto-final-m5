import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateAccountNumber = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, contactNumber, balance, active } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      accountNumber: generateAccountNumber(),
      name,
      email,
      password: hashedPassword, 
      contactNumber,
      balance,
      active: active !== undefined ? active : true,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '5h' });

    res.status(200).json({ message: 'Login bem-sucedido', token, userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
};


export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter usuário', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await User.update(req.body, {
      where: { id }
    });
    if (updated) {
      const updatedUser = await User.findByPk(id);
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await User.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário', error: error.message });
  }
};
