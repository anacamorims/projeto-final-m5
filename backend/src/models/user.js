

module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Usuario.associate = (models) => {
      Usuario.hasMany(models.Cartao, {
        foreignKey: 'usuarioId',
        as: 'cartoes',
      });
    };
  
    return Usuario;
  };
  