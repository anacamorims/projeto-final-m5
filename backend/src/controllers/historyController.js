import { history } from "../models/transactionHistory";
const histories = [];

export const createHistory = (req,res) =>{
    const {} = req.body;
    let newHistory = new history();
    histories.push({newHistory});
    res.json({newHistory}); 
}

export const getAllHistory = (req,res) =>{
    const userHistory = histories.filter(item => item.userId === userId);
    res.json({ userHistory});
    //puxar pelo id do usuário
}

export const getTransactionHistory = (req,res) =>{
    const transactionInformation = histories.filter(item.id === id)
    res.json({transactionInformation});
    //puxar pelo id da transação
}

