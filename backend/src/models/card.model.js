import { DataTypes } from "sequelize";
import sequelize from "../database/db.js"; 
import User from "./user.model.js";  

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
    allowNull: true, 
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,  
      key: 'id'
    }
  },
}, {
  timestamps: true, 
});

Cartao.associate = (models) => {
  Cartao.belongsTo(models.User, {  
    foreignKey: 'usuarioId',
    as: 'usuario',
  });
};

export default Cartao;
