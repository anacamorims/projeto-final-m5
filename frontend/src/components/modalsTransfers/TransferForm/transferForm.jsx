import React from "react";
import styles from "../modalGlobal.module.css";

export default function ModalTransfer({ onClose }) {
  return (
    <div className={styles.modal}>
      <button className={styles.closeButton} onClick={onClose}>
        Fechar
      </button>
      <h1>Transferir</h1>
      <p>Aqui vai o conteúdo da transferência.</p>
    </div>
  );
}
