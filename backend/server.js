import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './src/docs/swagger.json' assert { type: 'json' };
import userRoutes from './src/routes/user.routes.js';
import sequelize from './src/database/db.js';
import transactionRoutes from './src/routes/transaction.routes.js';
import historyRoutes from "./src/routes/history.routes.js";
import cardRoutes from './src/routes/card.routes.js';
import cors from 'cors';  
import User from './src/models/user.model.js';
import Cartao from './src/models/card.model.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações de CORS (opcional)
const corsOptions = {
  origin: 'http://localhost:3000', // Mude para seu domínio de frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Configuração da documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/cards', cardRoutes);

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Inicialização do servidor e autenticação do Sequelize
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Inicializando as associações
    User.associate({ Cartao });
    Cartao.associate({ User });

    // Sincronize o modelo com o banco de dados se necessário
    await sequelize.sync(); // Use `await` se precisar aguardar a sincronização

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

startServer();
