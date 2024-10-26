import React from "react";
import modalStyles from "../modalGlobal.module.css";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';


export default function ModalScanner({ onClose }) {
  return (
    <div className={modalStyles.modal}>
      <button className={modalStyles.closeButton} onClick={onClose}>
        <ArrowBackIosNewRoundedIcon/>
      </button>
      <h1>Scanner</h1>
      <p>Aqui vai o conteúdo para o scanner.</p>
    </div>
  );
}
