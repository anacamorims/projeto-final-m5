import React, { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { v4 as uuidv4 } from "uuid"; // Biblioteca para gerar UUIDs únicos
import modalStyles from "../modalGlobal.module.css";
import styles from "./qrcode.module.css";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

export default function ModalQrCode({ onClose, userData }) {
  const [amount, setAmount] = useState(100);
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [geoLocation, setGeoLocation] = useState(null);
  const qrCodeRef = useRef();

  useEffect(() => {
    // Função para obter a localização atual
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setGeoLocation({ latitude, longitude });
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
        setGeoLocation({ latitude: null, longitude: null });
      }
    );
  }, []);

  useEffect(() => {
    if (userData && geoLocation) {
      const transactionId = uuidv4(); // Gerando um UUID único para a transação
      const qrData = {
        accountNumber: userData.accountNumber,
        userName: userData.name,
        value: (amount / 100).toFixed(2),
        currency: "BRL",
        description: "Pagamento realizado via QR Code",
        category: "Alimentação",
        paymentMethod: "Pix",
        generatedAt: new Date().toISOString(),
        validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h de validade
        transactionId,
        geoLocation,
      };
      setQrCodeValue(JSON.stringify(qrData));
    }
  }, [amount, userData, geoLocation]);

  const handleDownloadQRCode = () => {
    if (qrCodeValue) {
      const canvas = qrCodeRef.current;
      const pngUrl = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `qrcode_pagamento_${(amount / 100).toFixed(
        2
      )}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const handleShareQRCode = async () => {
    if (qrCodeValue) {
      const canvas = qrCodeRef.current;
      const pngUrl = canvas.toDataURL("image/png");

      try {
        await navigator.share({
          title: "QR Code para Pagamento",
          text: "Clique para efetuar o pagamento!",
          files: [
            new File(
              [await (await fetch(pngUrl)).blob()],
              `qrcode_pagamento_${(amount / 100).toFixed(2)}.png`,
              { type: "image/png" }
            ),
          ],
        });
        alert("QR Code compartilhado com sucesso!");
      } catch (err) {
        console.error("Erro ao compartilhar:", err);
        alert("Falha ao compartilhar o QR Code.");
      }
    }
  };

  const incrementAmount = () => setAmount((prev) => prev + 500);
  const decrementAmount = () => setAmount((prev) => Math.max(0, prev - 500));

  const formatCurrency = (value) => {
    const numericValue = value.replace(/\D/g, "");
    return (numericValue / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, "");
    setAmount(parseInt(numericValue || 0, 10));
  };

  return (
    <div className={modalStyles.modal}>
      <button className={modalStyles.closeButton} onClick={onClose}>
        <ArrowBackIosNewRoundedIcon />
      </button>

      <div className={styles.qrcodeContent}>
        <h4>QR Code de Pagamento</h4>
        <div className={styles.qrcodeInput}>
          <button className={styles.buttonDecrement} onClick={decrementAmount}>
            -
          </button>
          <input
            type="text"
            value={formatCurrency(amount.toString())}
            onChange={handleInputChange}
            aria-label="Valor do pagamento"
          />
          <button className={styles.buttonIncrement} onClick={incrementAmount}>
            +
          </button>
        </div>

        <div className={styles.qrcodeCanva}>
          <QRCodeCanvas ref={qrCodeRef} value={qrCodeValue} />

          <div className={styles.downloadShareButtons}>
            <button
              className={styles.downloadButton}
              onClick={handleDownloadQRCode}
            >
              <div className={styles.iconButton}>
                <FileDownloadRoundedIcon />
              </div>
              <span>Baixar</span>
            </button>
            <button
              className={styles.shareButton}
              onClick={handleShareQRCode}
            >
              <div className={styles.iconButton}>
                <ShareRoundedIcon />
              </div>
              <span>Enviar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
