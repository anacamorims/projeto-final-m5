import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './src/docs/swagger.json' assert { type: 'json' };

import userRoutes from './src/routes/user.routes.js';
import sequelize from './src/database/db.js';
import transationRoutes from './src/routes/transaction.routes.js'
import historyRoutes from "./src/routes/history.routes.js"
import cardRoutes from './src/routes/card.routes.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(userRoutes);
app.use(transationRoutes)
app.use(historyRoutes)
app.use(cardRoutes)

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  await sequelize.authenticate();
});
