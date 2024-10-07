import express from 'express';
import cardRoutes from './src/routes/card.routes.js'; 
import userRoutes from './src/routes/user.routes.js';
import transactionRoutes from './src/routes/transaction.routes.js'; 
import sequelize from './src/database/db.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/cards', cardRoutes); 
app.use('/api/transactions', transactionRoutes);


app.listen(PORT, async () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    await sequelize.authenticate();
  });
  