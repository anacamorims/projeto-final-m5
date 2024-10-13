import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import Card from "../../../components/card-bank/card";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import PixRoundedIcon from "@mui/icons-material/PixRounded";
import CurrencyBitcoinRoundedIcon from "@mui/icons-material/CurrencyBitcoinRounded";
import Loader from "../../../components/loader/loader";

export default function HomeApp() {
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [userNames, setUserNames] = useState({});
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
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário", error);
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
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Erro ao buscar transações", error);
      }
    };

    if (userId) {
      fetchUserData();
      fetchTransactions();
    }
  }, [userId]);

  const fetchUserName = async (id) => {
    if (userNames[id]) return userNames[id];

    try {
      const response = await fetch(
        `https://projeto-final-m5-api.onrender.com/api/users/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      const data = await response.json();
      setUserNames((prev) => ({ ...prev, [id]: data.name }));
      return data.name;
    } catch (error) {
      console.error("Erro ao buscar nome do usuário", error);
      return "Desconhecido";
    }
  };

  const prepareTransactions = async () => {
    const transactionsWithTitles = await Promise.all(
      transactions.map(async (transaction) => {
        const otherUserId =
          transaction.userId !== parseInt(userId) ? transaction.userId : null;
        const otherUserName = otherUserId
          ? await fetchUserName(otherUserId)
          : "Você";

        const title =
          transaction.amount < 0
            ? `Transferência para ${otherUserName}`
            : `Recebimento de ${otherUserName}`;

        return { ...transaction, title };
      })
    );
    setTransactions(transactionsWithTitles);
  };

  useEffect(() => {
    if (transactions.length > 0) {
      prepareTransactions();
    }
  }, [transactions]);

  if (!userData) return <Loader />;

  return (
    <>
      <div className={styles.backgroundAnimation}>
        <div className={styles.circleOne}></div>
        <div className={styles.circleTwo}></div>
      </div>
      <section className={styles.container}>
        <nav className={styles.navbar}>
          <div className={styles.avatarUser}>
            <AccountCircleRoundedIcon fontSize="large" />
          </div>
          <div className={styles.welcomeText}>
            <span>Bem-vindo(a),</span>
            <h4>{userData.name}</h4>
          </div>
        </nav>

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
              {transactions.map((transaction) => {
                const isReceived = transaction.amount > 0;
                return (
                  <li
                    key={transaction.transactionId}
                    className={styles.transactionItem}
                  >
                    <div
                      className={styles.transactionIcon}
                      style={{
                        color: isReceived ? "#5dae0d" : "#ca0e04",
                      }}
                    >
                      <CurrencyExchangeRoundedIcon />
                    </div>
                    <div className={styles.transactionContent}>
                      <div className={styles.transactionTitle}>
                        {transaction.title}
                      </div>
                      <div className={styles.transactionDate}>
                        <small>
                          {new Date(transaction.createdAt).toLocaleDateString()}{" "}
                          - {new Date(transaction.createdAt).toLocaleTimeString()}
                        </small>
                      </div>
                    </div>
                    <div
                      className={styles.transactionBalance}
                      style={{
                        fontWeight: isReceived ? "bold" : "normal",
                        color: isReceived ? "white" : "gray",
                      }}
                    >
                      <span>R$ {transaction.amount.toFixed(2)}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
