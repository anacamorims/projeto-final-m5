import React, { useState, useEffect, useRef } from "react";
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
  const [facingMode, setFacingMode] = useState("environment");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const streamRef = useRef(null);
  
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const startCamera = async () => {
      if (videoRef.current) {
        try {
          streamRef.current = await navigator.mediaDevices.getUserMedia({
            video: { facingMode },
          });
          videoRef.current.srcObject = streamRef.current;
          videoRef.current.play();
        } catch (error) {
          console.error("Erro ao acessar a câmera:", error);
          alert("Erro ao acessar a câmera. Verifique as permissões.");
        }
      }
    };

    const stopCamera = () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
        streamRef.current = null; 
      }
    };

    if (useCamera) {
      startCamera();
      intervalRef.current = setInterval(handleScan, 100); // Inicia a leitura a cada 100ms
    } else {
      stopCamera();
      clearInterval(intervalRef.current); // Limpa o intervalo ao parar a câmera
    }

    return () => {
      clearInterval(intervalRef.current); // Limpa o intervalo ao desmontar
      stopCamera(); // Para a câmera quando o componente é desmontado
    };
  }, [useCamera, facingMode]);

  const handleScan = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const video = videoRef.current;

    if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const qrCode = jsQR(imageData.data, canvas.width, canvas.height);
      if (qrCode) {
        handleScanResult(qrCode.data);
      }
    }
  };

  const handleScanResult = (qrData) => {
    setScanResult(qrData);
    try {
      const parsedData = JSON.parse(qrData);
      const currentDate = new Date();
      const validUntil = new Date(parsedData.validUntil);

      if (validUntil < currentDate) {
        alert("QR Code expirado ou inválido.");
        return;
      }

      setPaymentData(parsedData);
      onQRCodeRead(qrData);
      setUseCamera(false); // Desativar a câmera após ler o QR Code
    } catch (error) {
      alert("Erro ao ler o QR Code: Formato inválido.");
    }
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
          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const qrCode = jsQR(imageData.data, canvas.width, canvas.height);
          if (qrCode) {
            handleScanResult(qrCode.data);
          } else {
            alert("QR Code não encontrado.");
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleCamera = async () => {
    await stopCamera(); // Para a câmera atual
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment")); // Alterna a câmera
    await startCamera(); // Inicia a nova câmera
  };

  const handlePayment = async () => {
    try {
      const payload = {
        senderAccountNumber: String(userData.accountNumber), // Número da conta do remetente
        receiverAccountNumber: String(paymentData.accountNumber), // Número da conta do recebedor
        amount: parseFloat(paymentData.value), // Valor da transferência
        type: "transfer",
        description: paymentData.description || "Pagamento via QR Code",
      };
  
      console.log("Payload enviado:", payload); // Verifica o payload
  
      const response = await fetch("https://projeto-final-m5-api.onrender.com/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Pega o token do localStorage
        },
        body: JSON.stringify(payload), // Converte o payload em JSON
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Captura o erro retornado da API
        console.error("Erro da API:", errorData);
        alert(`Erro na transferência: ${errorData.message}`);
        return;
      }
  
      alert("Transferência realizada com sucesso!");
      setPaymentData(null); // Limpa os dados do pagamento após a transferência
      onClose(); // Fecha o modal após a transferência bem-sucedida
    } catch (error) {
      console.error("Erro ao realizar transferência:", error);
      alert("Falha na transferência.");
    }
  };
  
   

  const handleCancelPayment = () => {
    setPaymentData(null);
    setUseCamera(true); // Reinicia o uso da câmera
    setScanResult("");
  };

  const handleClose = () => {
    setUseCamera(false); // Desativa a câmera ao fechar o modal
    onClose();
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
              <video
                ref={videoRef}
                className={scannerStyles.videoBackground}
                autoPlay
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <canvas
                ref={canvasRef}
                style={{ display: "none" }}
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
              <span className={scannerStyles.fileInputText}>Carregar Arquivo</span>
            </label>
          )}

          <div className={scannerStyles.content}>
            <button className={modalStyles.closeButton} onClick={handleClose}>
              <ArrowBackIosNewRoundedIcon />
            </button>

            <div className={scannerStyles.radioButtons}>
              <label className={scannerStyles.radioLabel}>
                <input
                  type="radio"
                  checked={useCamera}
                  onChange={() => {
                    setUseCamera(true);
                    stopCamera(); // Para a câmera ao mudar para modo de arquivo
                  }}
                  className={scannerStyles.radioInput}
                />
                <PhotoCameraIcon className={scannerStyles.icon} />
                <span>Usar Câmera</span>
              </label>
              <label className={scannerStyles.radioLabel}>
                <input
                  type="radio"
                  checked={!useCamera}
                  onChange={() => {
                    setUseCamera(false);
                    stopCamera(); // Para a câmera ao mudar para modo de arquivo
                  }}
                  className={scannerStyles.radioInput}
                />
                <UploadIcon className={scannerStyles.icon} />
                <span>Carregar Imagem</span>
              </label>
            </div>

           
          </div>
        </>
      )}
    </div>
  );
}
