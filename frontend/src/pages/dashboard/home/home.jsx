import styles from "./home.module.css";
import React, { useEffect, useState } from "react";
import Card from "../../../components/card-bank/card";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import PixRoundedIcon from "@mui/icons-material/PixRounded";
import CurrencyBitcoinRoundedIcon from "@mui/icons-material/CurrencyBitcoinRounded";
import Loader from "../../../components/loader/loader";

export default function HomeApp() {
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://projeto-final-m5-api.onrender.com/api/users/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar dados do usuário");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `https://projeto-final-m5-api.onrender.com/history/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar histórico de transações");
        }

        const data = await response.json();
        setTransactions(data); // Armazena as transações no estado
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    };

    if (userId) {
      fetchUserData();
      fetchTransactions();
    }
  }, [userId]);

  if (!userData) return <Loader />; // Exibe loader enquanto carrega os dados

  return (
    <>
      <div className={styles.backgroundAnimation}>
        <div className={styles.circleOne}></div>
        <div className={styles.circleTwo}></div>
      </div>
      <section className={styles.container}>
        {/* Navbar */}
        <nav className={styles.navbar}>
          <div className={styles.avatarUser}>
            <AccountCircleRoundedIcon fontSize="large" />
          </div>
          <div className={styles.welcomeText}>
            <span>Bem-vindo(a),</span>
            <h4>{userData ? userData.name : "Carregando..."}</h4>
          </div>
        </nav>

        {/* Conteúdo principal */}
        <div className={styles.dashContent}>
          <div className={styles.containerResponse}>
            <div className={styles.cardContainer}>
              <Card />
            </div>
            <ul className={styles.icons}>
              <li className={styles.icon}>
                <AttachMoneyRoundedIcon fontSize="large" />
              </li>
              <li className={styles.icon}>
                <LocalMallRoundedIcon fontSize="large" />
              </li>
              <li className={styles.icon}>
                <PixRoundedIcon fontSize="large" />
              </li>
              <li className={styles.icon}>
                <CurrencyBitcoinRoundedIcon fontSize="large" />
              </li>
            </ul>
          </div>

          <div className={styles.transactions}>
            <div className={styles.transactionsNav}>
              <h3>Transações</h3>
              <span>Ver tudo</span>
            </div>
            <ul className={styles.transactionList}>
              {transactions.map((transaction) => (
                <li key={transaction.transactionId} className={styles.transactionItem}>
                  <div>
                    <strong>{transaction.action}</strong> - {transaction.description}
                  </div>
                  <div>
                    <span>R$ {transaction.amount.toFixed(2)}</span>
                    <br />
                    <small>
                      {new Date(transaction.createdAt).toLocaleDateString()} -{" "}
                      {new Date(transaction.createdAt).toLocaleTimeString()}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
