import React, { useEffect, useState } from "react";
import styles from "./transfer.module.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import TagRoundedIcon from "@mui/icons-material/TagRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import Loader from "./../../../components/loader/loader";
import Animation from "./../../../components/backgroundAnim/animation";
import { QRCodeCanvas } from "qrcode.react"; // Biblioteca de geração de QR
import QrScanner from "react-qr-scanner"; // Biblioteca de leitura de QR

//icones
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import QrCodeRoundedIcon from "@mui/icons-material/QrCodeRounded";
import QrCodeScannerRoundedIcon from "@mui/icons-material/QrCodeScannerRounded";
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';

export default function Transfer() {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    receiverId: "",
    amount: "",
    description: "",
    requestAmount: "", // Novo campo para valor solicitado
  });
  const [qrCodeValue, setQrCodeValue] = useState(""); // Valor para o QR Code
  const [isQrScannerOpen, setQrScannerOpen] = useState(false); // Controle de leitura de QR

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

    fetchUserData();
  }, [userId]);

  // Função para gerar o QR Code com o valor solicitado
  const generateQrCode = () => {
    if (!formData.requestAmount) {
      alert("Por favor, defina o valor solicitado para gerar o QR Code.");
      return;
    }

    const qrData = JSON.stringify({
      receiverId: formData.receiverId,
      amount: formData.requestAmount, // Usando o valor solicitado no QR
      description: formData.description,
    });

    setQrCodeValue(qrData);
  };

  // Função para lidar com o scanner de QR Code
  const handleScan = (data) => {
    if (data) {
      const parsedData = JSON.parse(data.text); // Assumindo que o QR Code contém JSON
      setFormData({
        receiverId: parsedData.receiverId || "",
        amount: parsedData.amount || "",
        description: parsedData.description || "",
      });
      setQrScannerOpen(false); // Fecha o scanner
    }
  };

  const handleError = (err) => {
    console.error("Erro no scanner:", err);
    alert("Erro ao ler QR Code.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Valida e envia a transferência (sem mudanças nessa função)
  };

  if (!userData) return <Loader />; // Exibe carregamento enquanto busca os dados

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
              <li className={styles.transferOption}>
                <div className={styles.iconOption}>
                  <SwapHorizRoundedIcon />
                </div>
                <span>Transfer</span>
              </li>
              <li className={styles.transferOption}>
                <div className={styles.iconOption}>
                  <QrCodeRoundedIcon />
                </div>
                <span>QrCode</span>
              </li>
              <li className={styles.transferOption}>
                <div className={styles.iconOption}>
                  <QrCodeScannerRoundedIcon />
                </div>
                <span>Scanner</span>
              </li>
              <li className={styles.transferOption}>
                <div className={styles.iconOption}>
                  <PaymentsRoundedIcon/>
                </div>
                <span>empréstimo</span>
              </li>
            </ul>
          </div>

          <div className={styles.transferRecent}>
            <div className={styles.recentTransfer}>
              <h6>Transferências recentes</h6>
              <ul className={styles.transferList}>
                {/* Exibe as transferências recentes */}
                {/*... */}
              </ul>
              </div>
  
          </div>

          {/* <form className={styles.formTransfer} onSubmit={handleSubmit}> 
            <div className={styles.input_field}>
              <input
                required
                name="receiverId"
                type="number"
                value={formData.receiverId}
                onChange={(e) =>
                  setFormData({ ...formData, receiverId: e.target.value })
                }
              />
              <label>Número da conta</label>
              <span className={styles.icon}>
                <TagRoundedIcon />
              </span>
            </div>
            <div className={styles.input_field}>
              <input
                required
                name="amount"
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
              <label>Valor enviado</label>
              <span className={styles.icon}>
                <AttachMoneyRoundedIcon />
              </span>
            </div>

            <div className={styles.input_field}>
              <input
                required
                name="requestAmount"
                type="number"
                value={formData.requestAmount}
                onChange={(e) =>
                  setFormData({ ...formData, requestAmount: e.target.value })
                }
              />
              <label>Valor solicitado (QR Code)</label>
            </div>

            <div className={styles.textarea_field}>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              ></textarea>
              <label>Descrição</label>
            </div>

            

            <div className={styles.transferButton}>
              <button type="submit">Transferir</button>
            </div>
          </form> */}

          {/* <div className={styles.qrSection}>
            <button onClick={generateQrCode}>Gerar QR Code</button>
            {qrCodeValue && (
              <div className={styles.qrCode}>
                <QRCodeCanvas value={qrCodeValue} size={256} />
              </div>
            )}

            <button onClick={() => setQrScannerOpen(true)}>Ler QR Code</button>
            {isQrScannerOpen && (
              <QrScanner
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%" }}
              />
            )}
          </div> */}
        </div>
      </section>
    </>
  );
}
