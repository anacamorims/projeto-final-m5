// src/models/transaction.model.js
import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

const Transaction = sequelize.define(
  "Transaction",
  {
    senderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("transfer", "deposit", "withdraw"),
      allowNull: false,
      defaultValue: "transfer",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export default Transaction;
