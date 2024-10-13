import styles from "./card.module.css";

const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardInfo}>
        <div className={styles.cardLogo}>MasterCard</div>
        <div className={styles.cardChip}>
          <svg
            className={styles.cardChipLines}
            role="img"
            width="20px"
            height="20px"
            viewBox="0 0 100 100"
            aria-label="Chip"
          >
            <g opacity="0.8">
              <polyline
                points="0,50 35,50"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              ></polyline>
              <polyline
                points="0,20 20,20 35,35"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              ></polyline>
              <polyline
                points="50,0 50,35"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              ></polyline>
              <polyline
                points="65,35 80,20 100,20"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              ></polyline>
              <polyline
                points="100,50 65,50"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              ></polyline>
              <polyline
                points="35,35 65,35 65,65 35,65 35,35"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              ></polyline>
              <polyline
                points="0,80 20,80 35,65"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              ></polyline>
              <polyline
                points="50,100 50,65"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              ></polyline>
              <polyline
                points="65,65 80,80 100,80"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              ></polyline>
            </g>
          </svg>
          <div className={styles.cardChipTexture}></div>
        </div>
        <div className={styles.cardType}>debit</div>
        <div className={styles.cardNumber}>
          <span className={styles.cardDigitGroup}>0123</span>
          <span className={styles.cardDigitGroup}>4567</span>
          <span className={styles.cardDigitGroup}>8901</span>
          <span className={styles.cardDigitGroup}>2345</span>
        </div>
        <div className={styles.cardValidThru} aria-label="Valid thru">
          Valid
          <br />
          thru
        </div>
        <div className={styles.cardExpDate}>
          <time dateTime="2038-01">01/38</time>
        </div>
        <div className={styles.cardName} aria-label="Dee Stroyer">
          Jk Huger
        </div>
        <div
          className={styles.cardVendor}
          role="img"
          aria-labelledby="card-vendor"
        >
          <span id="card-vendor" className={styles.cardVendorSr}>
            Mastercard
          </span>
        </div>
        <div className={styles.cardTexture}></div>
      </div>
    </div>
  );
};

export default Card; // Esta linha garante a exportação padrão
