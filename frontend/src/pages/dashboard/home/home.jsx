import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import Card from "../../../components/card-bank/card";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import PixRoundedIcon from "@mui/icons-material/PixRounded";
import CurrencyBitcoinRoundedIcon from "@mui/icons-material/CurrencyBitcoinRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import Loader from "../../../components/loader/loader";
import Animation from "../../../components/backgroundAnim/animation";
import {
  AccountBalance,
  CreditCard,
  TransferWithinAStation,
  Description,
  MobileFriendly,
  Assessment,
  TrendingUp,
  AttachMoney,
} from "@mui/icons-material";

export default function HomeApp() {
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [isBalanceVisible, setIsBalanceVisible] = useState(true); // Controle de visibilidade do saldo

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

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prev) => !prev);
  };

  if (!userData) return <Loader />;

  return (
    <>
      <Animation />
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
            <div className={styles.infoContainer}>
              <div className={styles.infoBankName}>
                <AccountBalanceWalletRoundedIcon />
                <span>Sua carteira</span>
              </div>
              <div className={styles.infoAmount}>
                <h1>
                  R$
                  {isBalanceVisible
                    ? ` ${userData.balance.toFixed(2)}`
                    : "*****"}
                </h1>
                <button
                  onClick={toggleBalanceVisibility}
                  className={styles.eyeIcon}
                >
                  {isBalanceVisible ? (
                    <VisibilityRoundedIcon />
                  ) : (
                    <VisibilityOffRoundedIcon />
                  )}
                </button>
              </div>
              <ul className={styles.icons}>
                <li className={styles.icon}>
                  <div className={styles.iconSvg}>
                    <AttachMoneyRoundedIcon fontSize="large" />
                  </div>
                  Saldo
                </li>
                <li className={styles.icon}>
                  <div className={styles.iconSvg}>
                    <LocalMallRoundedIcon fontSize="large" />
                  </div>
                  Loja
                </li>
                <li className={styles.icon}>
                  <div className={styles.iconSvg}>
                    <PixRoundedIcon fontSize="large" />
                  </div>
                  Pix
                </li>
                <li className={styles.icon}>
                  <div className={styles.iconSvg}>
                    <CurrencyBitcoinRoundedIcon fontSize="large" />
                  </div>
                  Bitcoin
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.services}>
            <div className={styles.servicesContent}>
              <div className={styles.servicesNav}>
                <h3>Outros Serviços</h3>
                <span>Ver tudo</span>
              </div>
              <ul className={styles.servicesList}>
                <li className={styles.servicesItem}>
                  <div className={styles.servicesIcon}>
                    <AccountBalance />
                  </div>
                  Conta
                </li>
                <li className={styles.servicesItem}>
                  <div className={styles.servicesIcon}>
                    <CreditCard />
                  </div>
                  Cartões
                </li>
                <li className={styles.servicesItem}>
                  <div className={styles.servicesIcon}>
                    <TransferWithinAStation />
                  </div>
                  Transferir
                </li>
                <li className={styles.servicesItem}>
                  <div className={styles.servicesIcon}>
                    <Description />
                  </div>
                  Boleto
                </li>
                <li className={styles.servicesItem}>
                  <div className={styles.servicesIcon}>
                    <MobileFriendly />
                  </div>
                  Recarga
                </li>
                <li className={styles.servicesItem}>
                  <div className={styles.servicesIcon}>
                    <Assessment />
                  </div>
                  Gastos
                </li>
                <li className={styles.servicesItem}>
                  <div className={styles.servicesIcon}>
                    <TrendingUp />
                  </div>
                  Investir
                </li>
                <li className={styles.servicesItem}>
                  <div className={styles.servicesIcon}>
                    <AttachMoney />
                  </div>
                  Crédito
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.partnersContainer}></div>

          {/* <div className={styles.transactions}>
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
                        {transaction.amount < 0
                          ? "Transferência"
                          : "Recebimento"}
                      </div>
                      <div className={styles.transactionDate}>
                        <small>
                          {new Date(transaction.createdAt).toLocaleDateString()}{" "}
                          -{" "}
                          {new Date(transaction.createdAt).toLocaleTimeString()}
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
          </div> */}
        </div>
      </section>
    </>
  );
}
