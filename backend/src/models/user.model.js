import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js'; 

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  },
  name: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactNumber: {
    type: DataTypes.STRING,
  },
  balance: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
});

// Adicionando a associação
User.associate = (models) => {
  User.hasMany(models.Cartao, {
    foreignKey: 'usuarioId',
    as: 'cartoes',
  });
};

export default User;
