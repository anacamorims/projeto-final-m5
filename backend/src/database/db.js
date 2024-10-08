import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import pkg from 'pg';

const { Client } = pkg;

dotenv.config();

// Função para criar o banco de dados se não existir
const createDatabaseIfNotExists = async () => {
  try {
    const client = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
      ssl: process.env.DB_SSL === 'true' ? {
        require: true,
        rejectUnauthorized: false
      } : false,
    });

    await client.connect();

    const dbName = process.env.DB_NAME;
    const checkDbQuery = `SELECT 1 FROM pg_database WHERE datname = '${dbName}'`;
    const result = await client.query(checkDbQuery);

    if (result.rowCount === 0) {
      const createDbQuery = `CREATE DATABASE "${dbName}"`;
      await client.query(createDbQuery);
      console.log(`Banco de dados "${dbName}" criado com sucesso.`);
    } else {
      console.log(`Banco de dados "${dbName}" já existe.`);
    }

    await client.end();
  } catch (err) {
    console.error('Erro ao tentar criar o banco de dados:', err);
    throw err; 
  }
};

// Inicializa o Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
  logging: false,
  dialectOptions: {
    ssl: process.env.DB_SSL === 'true' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  }
});

// Função para criar o banco de dados e as tabelas
const createDatabaseAndTable = async () => {
  try {
    await createDatabaseIfNotExists(); // Tenta criar o banco de dados

    await new Promise(resolve => setTimeout(resolve, 2000)); // Espera um pouco para garantir que o banco de dados está pronto

    await sequelize.authenticate(); // Tenta autenticar a conexão
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    await sequelize.sync({ force: false }); // Sincroniza as tabelas
    console.log('Tabelas sincronizadas com sucesso.');
  } catch (err) {
    console.error('Não foi possível conectar ao banco de dados:', err);
  }
};

// Exporta a instância do Sequelize
export default sequelize;

// Chama a função para criar o banco de dados e as tabelas
createDatabaseAndTable();
