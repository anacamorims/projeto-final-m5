import React, { useState } from "react";
import QrScanner from "react-qr-scanner"; 
import jsQR from "jsqr"; 
import modalStyles from "../modalGlobal.module.css"; 
import scannerStyles from "./scanner.module.css"

export default function ModalScanner({ onClose, onQRCodeRead = () => {}, userData }) {
  const [scanResult, setScanResult] = useState(""); 
  const [useCamera, setUseCamera] = useState(true); 
  const [paymentData, setPaymentData] = useState(null);

  const handleScan = (data) => {
    if (data) {
      const qrData = typeof data === 'object' && data !== null ? data.text : data; 
      setScanResult(qrData);
      const parsedData = JSON.parse(qrData); 
      setPaymentData(parsedData); 
      onQRCodeRead(qrData); 
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgElement = document.createElement("img");
        imgElement.src = e.target.result;
        imgElement.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = imgElement.width;
          canvas.height = imgElement.height;
          context.drawImage(imgElement, 0, 0);

          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const qrCode = jsQR(imageData.data, canvas.width, canvas.height);
          if (qrCode) {
            setScanResult(qrCode.data);
            const parsedData = JSON.parse(qrCode.data); 
            setPaymentData(parsedData); 
            onQRCodeRead(qrCode.data); 
          } else {
            alert("QR Code não encontrado.");
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePayment = async () => {
    if (!paymentData) {
      alert("Nenhum dado de pagamento encontrado.");
      return;
    }

    const { accountNumber, value, description } = paymentData; 

    const payload = {
      senderAccountNumber: userData.accountNumber, 
      receiverAccountNumber: accountNumber,
      amount: parseFloat(value),
      type: "payment",
      description: description || "Pagamento realizado via QR Code",
    };

    console.log("Payload enviado:", payload); 

    try {
      const response = await fetch(
        "https://projeto-final-m5-api.onrender.com/api/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); 
        console.error("Erro da API:", errorData);
        alert(`Erro no pagamento: ${errorData.message}`);
        return;
      }

      alert("Pagamento realizado com sucesso!");
      onClose(); 
    } catch (error) {
      console.error("Erro ao realizar pagamento:", error);
      alert("Falha no pagamento.");
    }
  };

  return (
    <div className={modalStyles.modal}>
      <button className={modalStyles.closeButton} onClick={onClose}>
        Fechar
      </button>
      <h1>Scanner</h1>
      <div>
        <label>
          <input
            type="radio"
            checked={useCamera}
            onChange={() => setUseCamera(true)}
          />
          Usar Câmera
        </label>
        <label>
          <input
            type="radio"
            checked={!useCamera}
            onChange={() => setUseCamera(false)}
          />
          Carregar Arquivo
        </label>
      </div>
      {useCamera ? (
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
      ) : (
        <input type="file" accept="image/*" onChange={handleFileChange} />
      )}
      {paymentData && (
        <div>
          <h2>Dados do Pagamento:</h2>
          <p><strong>Conta do Recebedor:</strong> {paymentData.accountNumber}</p>
          <p><strong>Valor:</strong> {paymentData.value}</p>
          <p><strong>Descrição:</strong> {paymentData.description || "Pagamento realizado via QR Code"}</p>
          <button onClick={handlePayment} className={scannerStyles.paymentButton}>
            Confirmar Pagamento
          </button>
        </div>
      )}
    </div>
  );
}
