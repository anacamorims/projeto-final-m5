// PasswordStrengthInfo.js
import React from "react";
import style from "./PasswordStrengthInfo.module.css"; // Estilos para o popup

const PasswordStrengthInfo = ({ onClose }) => {
  return (
    <div className={style.popupOverlay}>
      <div className={style.popup}>
        <h2>Informações sobre a segurança da senha</h2>
        <p>
          <strong>Fraca:</strong> A senha é muito curta e não contém combinações de letras e números.
        </p>
        <p>
          <strong>Média:</strong> A senha contém letras e números, mas pode ser melhorada com caracteres especiais.
        </p>
        <p>
          <strong>Forte:</strong> A senha contém letras, números e caracteres especiais, tornando-a difícil de adivinhar.
        </p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default PasswordStrengthInfo;
