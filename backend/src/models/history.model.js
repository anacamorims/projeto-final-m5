import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const History = sequelize.define('History', {
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    transactionId: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    action: {
        type: DataTypes.ENUM('deposit', 'withdraw', 'transfer'),
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
});

export default History;
