import React from "react";
import styles from "../modalGlobal.module.css";

export default function ModalScanner({ onClose }) {
  return (
    <div className={styles.modal}>
      <button className={styles.closeButton} onClick={onClose}>
        Fechar
      </button>
      <h1>Scanner</h1>
      <p>Aqui vai o conteúdo para o scanner.</p>
    </div>
  );
}
