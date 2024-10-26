import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react"; 
import modalStyles from "../modalGlobal.module.css";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';


export default function ModalQrCode({ onClose, userData }) {
  const [amount, setAmount] = useState(""); 
  const [qrCodeValue, setQrCodeValue] = useState(""); 
  const qrCodeRef = useRef(); 

  const handleGenerateQRCode = () => {
    if (amount && userData) {
      const qrData = {
        accountNumber: userData.accountNumber,
        value: amount,
        description: "Pagamento realizado via QR Code"
      };

      setQrCodeValue(JSON.stringify(qrData));
    }
  };

  const handleDownloadQRCode = () => {
    if (qrCodeValue) {
      const canvas = qrCodeRef.current; 
      const pngUrl = canvas.toDataURL("image/png"); 

      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `qrcode_pagamento_${amount}.png`; 
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
          files: [new File([await (await fetch(pngUrl)).blob()], `qrcode_pagamento_${amount}.png`, { type: 'image/png' })]
        });
        alert("QR Code compartilhado com sucesso!");
      } catch (err) {
        console.error("Erro ao compartilhar:", err);
        alert("Falha ao compartilhar o QR Code.");
      }
    }
  };

  return (
    <div className={modalStyles.modal}>
      <button className={modalStyles.closeButton} onClick={onClose}>
        <ArrowBackIosNewRoundedIcon/>
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
          <button onClick={handleShareQRCode}>Compartilhar QR Code</button>
        </div>
      )}
    </div>
  );
}
