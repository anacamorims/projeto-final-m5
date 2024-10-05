import express from 'express';
import userRoutes from './src/routes/user.routes.js';
import sequelize from './src/database/db.js';
import { routerHistory } from "../backend/src/routes/historyRoutes.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use(userRoutes); 
app.use(routerHistory);


app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  await sequelize.authenticate();
});
