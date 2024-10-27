import React from "react";
import modalStyles from "../modalGlobal.module.css";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import styles from "./loan.module.css"; // Certifique-se de ter um arquivo CSS para os novos estilos.

export default function ModalScanner({ onClose }) {
  return (
    <div className={modalStyles.modal}>
      <button className={modalStyles.closeButton} onClick={onClose}>
        <ArrowBackIosNewRoundedIcon />
      </button>
      <div className={styles.content}>
        <h1 className={styles.title}>Página em Manutenção</h1>
        <p className={styles.message}>
          Solicite empréstimo no seu banco físico.
        </p>
      </div>
    </div>
  );
}
