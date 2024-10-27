import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import jsQR from "jsqr";
import modalStyles from "../modalGlobal.module.css";
import scannerStyles from "./scanner.module.css";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import UploadIcon from "@mui/icons-material/Upload";

export default function ModalScanner({
  onClose,
  onQRCodeRead = () => {},
  userData,
}) {
  const [scanResult, setScanResult] = useState("");
  const [useCamera, setUseCamera] = useState(true);
  const [paymentData, setPaymentData] = useState(null);

  const handleScan = (data) => {
    if (data) {
      const qrData =
        typeof data === "object" && data !== null ? data.text : data;
      setScanResult(qrData);

      try {
        const parsedData = JSON.parse(qrData);

        // Validação da data de validade
        const currentDate = new Date();
        const validUntil = new Date(parsedData.validUntil);

        if (validUntil < currentDate) {
          alert("QR Code expirado ou inválido.");
          return; // Impede a continuação se o QR Code estiver expirado
        }

        setPaymentData(parsedData);
        onQRCodeRead(qrData);
        setUseCamera(false); // Desativa a câmera após a leitura
      } catch (error) {
        alert("Erro ao ler o QR Code: Formato inválido.");
      }
    }
  };

  const handleError = (err) => console.error(err);

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
          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const qrCode = jsQR(imageData.data, canvas.width, canvas.height);
          if (qrCode) {
            handleScan(qrCode.data);
          } else {
            alert("QR Code não encontrado.");
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelPayment = () => {
    setPaymentData(null);
    setUseCamera(true);
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
        alert(`Erro no pagamento: ${errorData.message}`);
        return;
      }

      alert("Pagamento realizado com sucesso!");
      onClose();
    } catch (error) {
      alert("Falha no pagamento.");
    }
  };

  return (
    <div className={modalStyles.modal}>
      {paymentData ? (
        <div className={scannerStyles.paymentOverlay}>
          <h2 className={scannerStyles.title}>Dados do Pagamento:</h2>
          <div className={`${scannerStyles.paymentInfo} ${scannerStyles.card}`}>
            <p>
              <strong>Nome do Recebedor:</strong> {paymentData.userName}
            </p>
            <p>
              <strong>Conta:</strong> {paymentData.accountNumber}
            </p>
            <p>
              <strong>Valor:</strong> R$ {paymentData.value}
            </p>
            <p>
              <strong>Descrição:</strong>{" "}
              {paymentData.description || "Pagamento via QR Code"}
            </p>
            <p>
              <strong>ID Transação:</strong> {paymentData.transactionId}
            </p>
            <p>
              <strong>Validade:</strong> {paymentData.validUntil}
            </p>
          </div>
          <div className={scannerStyles.paymentButtons}>
            <button
              className={`${scannerStyles.paymentButton} ${scannerStyles.confirmButton}`}
              onClick={handlePayment}
            >
              Confirmar
            </button>
            <button
              className={`${scannerStyles.cancelButton} ${scannerStyles.cancelButton}`}
              onClick={handleCancelPayment}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          {useCamera ? (
            <>
              <QrScanner
                delay={300}
                onError={handleError}
                onScan={handleScan}
                className={scannerStyles.videoBackground}
              />
              <div className={scannerStyles.videoOverlay}></div>
            </>
          ) : (
            <label className={scannerStyles.fileInputLabel}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={scannerStyles.fileInput}
              />
              <span className={scannerStyles.fileInputText}>Carregar Arquivo</span>{" "}
              {/* Texto opcional */}
            </label>
          )}

          <div className={scannerStyles.content}>
            <button className={modalStyles.closeButton} onClick={onClose}>
              <ArrowBackIosNewRoundedIcon />
            </button>

            <div className={scannerStyles.radioButtons}>
              <label className={scannerStyles.radioLabel}>
                <input
                  type="radio"
                  checked={useCamera}
                  onChange={() => setUseCamera(true)}
                  className={scannerStyles.radioInput}
                />
                <PhotoCameraIcon className={scannerStyles.icon} />
                <span>Usar Câmera</span>
              </label>
              <label className={scannerStyles.radioLabel}>
                <input
                  type="radio"
                  checked={!useCamera}
                  onChange={() => setUseCamera(false)}
                  className={scannerStyles.radioInput}
                />
                <UploadIcon className={scannerStyles.icon} />
                <span>Carregar Arquivo</span>
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
