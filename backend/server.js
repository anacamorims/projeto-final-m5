import express from 'express';
import userRoutes from './src/routes/user.routes.js';
import sequelize from './src/database/db.js';
import transationRoutes from './src/routes/transaction.routes.js'
import historyRoutes from "./src/routes/history.routes.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(userRoutes);
app.use(transationRoutes)
app.use(historyRoutes)

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  await sequelize.authenticate();
});
