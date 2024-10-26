import React from "react";
import styles from "../modalGlobal.module.css";

export default function ModalQrCode({ onClose }) {
  return (
    <div className={styles.modal}>
      <button className={styles.closeButton} onClick={onClose}>
        Fechar
      </button>
      <h1>Gerar QR Code</h1>
      <p>Aqui vai o conteúdo para gerar o QR Code.</p>
    </div>
  );
}
