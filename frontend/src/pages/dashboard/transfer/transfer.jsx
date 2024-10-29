import React, { useEffect, useState } from "react";
import styles from "./transfer.module.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import TagRoundedIcon from "@mui/icons-material/TagRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import Loader from "./../../../components/loader/loader";
import Animation from "./../../../components/backgroundAnim/animation";

//icones
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import QrCodeRoundedIcon from "@mui/icons-material/QrCodeRounded";
import QrCodeScannerRoundedIcon from "@mui/icons-material/QrCodeScannerRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";

//components Modal
import ModalTransfer from "../../../components/modalsTransfers/TransferForm/transferForm";
import ModalQrCode from "../../../components/modalsTransfers/Qrcode/qrcode";
import ModalScanner from "../../../components/modalsTransfers/Scanner/scanner";
import ModalLoan from "../../../components/modalsTransfers/Loan/loan";

export default function Transfer() {
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [openModal, setOpenModal] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      console.error("User ID não encontrado");
      alert("Você precisa estar logado para acessar essa página.");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://projeto-final-m5-api.onrender.com/api/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erro na resposta:", errorData);
          alert(
            `Erro: ${errorData.message || "Não foi possível buscar os dados."}`
          );
          return;
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
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
        console.error("Erro ao buscar transações:", error);
      }
    };

    fetchUserData();
    fetchTransactions();
  }, [userId]);

  const handleOpenModal = (modalName) => setOpenModal(modalName);
  const handleCloseModal = () => setOpenModal(null);

  if (!userData) return <Loader />;

  return (
    <>
      <Animation />

      <section className={styles.container}>
        <nav className={styles.navbar}>
          <div className={styles.titleTransfer}>
            <h2>Transferir</h2>
          </div>
        </nav>

        <div className={styles.transferContent}>
          <div className={styles.transferMenu}>
            <div className={styles.amount}>
              <h6>Valor disponível</h6>
              <h2>
                <span>R$</span>{" "}
                {userData ? userData.balance.toFixed(2) : "Carregando..."}
              </h2>
            </div>
            <ul className={styles.menuButtons}>
              <li
                className={styles.transferOption}
                onClick={() => handleOpenModal("transfer")}
              >
                <div className={styles.iconOption}>
                  <SwapHorizRoundedIcon />
                </div>
                <span>Transfer</span>
              </li>

              <li
                className={styles.transferOption}
                onClick={() => handleOpenModal("qrcode")}
              >
                <div className={styles.iconOption}>
                  <QrCodeRoundedIcon />
                </div>
                <span>QrCode</span>
              </li>

              <li
                className={styles.transferOption}
                onClick={() => handleOpenModal("scanner")}
              >
                <div className={styles.iconOption}>
                  <QrCodeScannerRoundedIcon />
                </div>
                <span>Scanner</span>
              </li>

              <li
                className={styles.transferOption}
                onClick={() => handleOpenModal("loan")}
              >
                <div className={styles.iconOption}>
                  <PaymentsRoundedIcon />
                </div>
                <span>Empréstimo</span>
              </li>
            </ul>
          </div>

          <div className={styles.transferRecent}>
            <div className={styles.recentTransfer}>
              <h6>Transferências recentes</h6>
              <ul className={styles.transferList}>
                {transactions.map((transaction) => {
                  const isReceived = transaction.amount > 0;
                  return (
                    <li
                      key={transaction.transactionId}
                      className={styles.transactionItem}
                    >
                      <div
                        className={styles.transactionIcon}
                        style={{ color: isReceived ? "#5dae0d" : "#ca0e04" }}
                      >
                        <CurrencyExchangeRoundedIcon />
                      </div>
                      <div className={styles.transactionContent}>
                        <div className={styles.transactionTitle}>
                          {isReceived ? "Recebido" : "Enviado"}
                        </div>
                        <div className={styles.transactionDate}>
                          <small>
                            {new Date(
                              transaction.createdAt
                            ).toLocaleDateString()}{" "}
                            -{" "}
                            {new Date(
                              transaction.createdAt
                            ).toLocaleTimeString()}
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
        </div>
        
      </section>
      {openModal === "transfer" && <ModalTransfer onClose={handleCloseModal} />}
      {openModal === "qrcode" && (
        <ModalQrCode onClose={handleCloseModal} userData={userData} />
      )}
      {openModal === "scanner" && (
        <ModalScanner onClose={handleCloseModal} userData={userData} />
      )}
      {openModal === "loan" && <ModalLoan onClose={handleCloseModal} />}
    </>
  );
}