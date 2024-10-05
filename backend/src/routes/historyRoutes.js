import { Router} from "express";
import {createHistory, getAllHistory, getTransactionHistory } from "../controllers/historyController";
export const routerHistory= Router();

const routerGetUserHistory = routerHistory.get('/api/history/account', getAllHistory);
const routerGetTransctionHistory= routerHistory.get('/api/history', getTransactionHistory);
const routerCreateHistory = routerHistory.post('/seeOngIntelectual', createHistory);