import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

module.exports = (sequelize, DataTypes) => {
    const Cartao = sequelize.define('Cartao', {
      numero: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      vencimento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bandeira: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      codigo_seg: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.ENUM('Debito', 'Credito'),
        allowNull: false,
      },
      limite: {
        type: DataTypes.FLOAT,
        allowNull: true, // Opcional de débito
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    Cartao.associate = (models) => {
      Cartao.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario',
      });
    };
  
    return Cartao;
  };
  