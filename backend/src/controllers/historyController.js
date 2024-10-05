const histories = [];

export const getAllHistory = (req,res) =>{
    const userHistory = histories.filter(item => item.userId === userId);
    res.json({ userHistory});
}

export const getTransactionHistory = (req,res) =>{
    const transactionInformation = histories.filter(item.id === id)
    res.json({transactionInformation});
}

