import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
// Importando ícones
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import PixRoundedIcon from "@mui/icons-material/PixRounded";
import CurrencyBitcoinRoundedIcon from "@mui/icons-material/CurrencyBitcoinRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Backdrop from "@mui/material/Backdrop";
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
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(
    localStorage.getItem("notificationsViewed") !== "true"
  );

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
  
        if (data.length > 0) {
          const latestTransaction = data[0];
          const lastViewedTransactionId = localStorage.getItem("lastTransactionId");
  
          // Só atualize `notificationsViewed` se houver uma nova transação
          if (latestTransaction.id > lastViewedTransactionId) {
            setHasNewNotification(true);
            localStorage.setItem("notificationsViewed", "false"); // Marca como não visualizado
            localStorage.setItem("lastTransactionId", latestTransaction.id); // Atualiza o ID da última transação
  
            sendNotification(
              `Você tem uma nova transação: ${
                latestTransaction.amount < 0
                  ? "Transferência realizada"
                  : "Recebimento recebido"
              } de R$ ${latestTransaction.amount.toFixed(2)}`
            );
          } else {
            // Mantém o valor de `notificationsViewed` ao carregar a página
            const notificationsViewed = localStorage.getItem("notificationsViewed");
            setHasNewNotification(notificationsViewed !== "true");
          }
  
          const lastFiveTransactions = data.slice(0, 5);
          setNotifications(lastFiveTransactions);
        }
      } catch (error) {
        console.error("Erro ao buscar transações", error);
      }
    };
    
    if (userId) {
      fetchUserData();
      fetchTransactions();
    }
  }, [userId]);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Permissão para notificações concedida.");
        }
      });
    }
  }, []);

  const sendNotification = (message) => {
    if (Notification.permission === "granted") {
      new Notification("Nova Notificação", {
        body: message,
        icon: "/logo.png",
      });
    }
  };

  const toggleNotificationOpen = () => {
    setIsNotificationOpen((prev) => !prev);
  
    if (!isNotificationOpen) {
      setHasNewNotification(false);
      localStorage.setItem("notificationsViewed", "true");
    }
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prev) => !prev);
  };

  if (!userData) return <Loader />;

  return (
    <>
      <Animation />
      <section className={styles.container}>
        <nav className={styles.navbar}>
          <div className={styles.userInfo}>
            <div className={styles.avatarUser}>
              <AccountCircleRoundedIcon fontSize="large" />
            </div>
            <div className={styles.welcomeText}>
              <span>Bem-vindo(a),</span>
              <h4>{userData.name}</h4>
            </div>
          </div>

          <div className={styles.notificationsIcon}>
            <button onClick={toggleNotificationOpen}>
              <NotificationsRoundedIcon fontSize="large" />
              {hasNewNotification && (
                <span className={styles.notificationBadge}></span>
              )}
            </button>
          </div>
        </nav>

        <Backdrop
          open={isNotificationOpen}
          onClick={() => setIsNotificationOpen(false)}
          className={styles.backdrop}
        >
          <div
            className={styles.notificationContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.notificationHeader}>
              <h3>Notificações</h3>
              <button
                onClick={() => setIsNotificationOpen(false)}
                aria-label="Fechar Notificações"
              >
                <CloseRoundedIcon />
              </button>
            </div>
            <ul className={styles.notificationList}>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <li key={index} className={styles.notificationItem}>
                    <div className={styles.notificationIcon}>
                      <CurrencyExchangeRoundedIcon />
                    </div>
                    <div className={styles.notificationContent}>
                      <p>
                        {notification.amount < 0
                          ? "Transferência realizada"
                          : "Recebimento recebido"}
                      </p>
                      <small>
                        {new Date(notification.createdAt).toLocaleDateString()}{" "}
                        - {new Date(notification.createdAt).toLocaleTimeString()}
                      </small>
                    </div>
                    <span
                      style={{
                        color: notification.amount > 0 ? "#5dae0d" : "#ca0e04",
                      }}
                    >
                      R$ {notification.amount.toFixed(2)}
                    </span>
                  </li>
                ))
              ) : (
                <li className={styles.notificationItem}>
                  <p>Sem notificações no momento.</p>
                </li>
              )}
            </ul>
          </div>
        </Backdrop>

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
                  Descrição
                </li>
                <li className={styles.servicesItem}>
                  <div className={styles.servicesIcon}>
                    <MobileFriendly />
                  </div>
                  Móvel
                </li>
                <li className={styles.servicesItem}>
                  <div className={styles.servicesIcon}>
                    <Assessment />
                  </div>
                  Relatórios
                </li>
                <li className={styles.servicesItem}>
                  <div className={styles.servicesIcon}>
                    <TrendingUp />
                  </div>
                  Tendências
                </li>
                <li className={styles.servicesItem}>
                  <div className={styles.servicesIcon}>
                    <AttachMoney />
                  </div>
                  Pagamentos
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
