// ModalComponent.js
import React from "react";
import Modal from "react-modal";
import styles from "./modalProfile.module.css";

const customOverlayStyles = {
    position: 'fixed',
    inset: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Altere a cor conforme desejado
  };
  
  const ModalComponent = ({ isOpen, onRequestClose, title, children }) => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            maxWidth: '600px',
            height: '100%',
            padding: '20px',
            borderRadius: '10px',
            background: 'rgba(0, 0, 0, 0.8)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(4.2px)',
            WebkitBackdropFilter: 'blur(4.2px)',
          },
          overlay: customOverlayStyles // Aplicando o estilo ao overlay
        }}
        ariaHideApp={false}
      >
        <div className={styles.modalNav}>
          <button onClick={onRequestClose} className={styles.closeButton}>
            X
          </button>
        </div>
  
        <div className={styles.modalContent}>
          <div className={styles.contentTitle}>
            <h2>{title}</h2>
          </div>
  
          <div className={styles.contentBody}>{children}</div>
        </div>
      </Modal>
    );
  };
  

export default ModalComponent;
