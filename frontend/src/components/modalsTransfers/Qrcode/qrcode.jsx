import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Biblioteca de geração de QR
import modalStyles from "../modalGlobal.module.css"; // Estilo global do modal

export default function ModalQrCode({ onClose, userData }) {
  const [amount, setAmount] = useState(""); // Estado para armazenar o valor do pagamento
  const [qrCodeValue, setQrCodeValue] = useState(""); // Estado para armazenar o valor do QR Code
  const qrCodeRef = useRef(); // Referência para o QR Code

  const handleGenerateQRCode = () => {
    if (amount && userData) {
      // Constrói um objeto com as informações necessárias
      const qrData = {
        accountNumber: userData.accountNumber,
        value: amount,
        description: "Pagamento realizado via QR Code"
      };

      // Stringifica o objeto em JSON
      setQrCodeValue(JSON.stringify(qrData));
    }
  };

  const handleDownloadQRCode = () => {
    // Verifica se qrCodeValue está definido
    if (qrCodeValue) {
      const canvas = qrCodeRef.current; // Acessa o canvas do QR Code
      const pngUrl = canvas.toDataURL("image/png"); // Converte o canvas em uma URL de imagem PNG

      // Cria um link temporário para download
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `qrcode_pagamento_${amount}.png`; // Nome do arquivo para download
      document.body.appendChild(downloadLink); // Adiciona o link ao corpo do documento
      downloadLink.click(); // Simula um clique no link para iniciar o download
      document.body.removeChild(downloadLink); // Remove o link do DOM
    }
  };

  return (
    <div className={modalStyles.modal}>
      <button className={modalStyles.closeButton} onClick={onClose}>
        Fechar
      </button>
      <h1>Gerar QR Code</h1>
      <input
        type="number"
        placeholder="Valor a ser pago"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleGenerateQRCode}>Gerar QR Code</button>
      {qrCodeValue && (
        <div>
          <h2>QR Code:</h2>
          <QRCodeCanvas ref={qrCodeRef} value={qrCodeValue} />
          <button onClick={handleDownloadQRCode}>Baixar QR Code</button>
        </div>
      )}
    </div>
  );
}
