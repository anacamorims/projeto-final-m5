import { useEffect, useState } from "react";
import styles from "./card.module.css";

const Card = () => {
  const [cardData, setCardData] = useState({
    type: "x",
    number: "xxxxxxxxxxxxxxxx",
    expiryDate: "xx/xx",
    expiryDateFormatted: "xx/xx",
    cardholderName: "xxxxxxxx",
  });
  const userId = localStorage.getItem("userId"); // Certifique-se de que "userId" é a chave correta

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch(`https://projeto-final-m5-api.onrender.com/${userId}/card`);
        if (!response.ok) {
          throw new Error("Erro ao buscar dados do cartão");
        }
        const data = await response.json();

        // Verifique se os dados do cartão são válidos e atualize o estado
        if (Array.isArray(data) && data.length > 0) {
          const cardInfo = data[0]; // Acesse o primeiro cartão
          setCardData({
            type: cardInfo.tipo || "x",
            number: cardInfo.numero || "xxxxxxxxxxxxxxxx",
            expiryDate: cardInfo.vencimento || "xx/xx",
            expiryDateFormatted: cardInfo.vencimento || "xx/xx",
            cardholderName: cardInfo.bandeira || "xxxxxxxx",
          });
        } else {
          // Se não encontrar dados do cartão, use os valores padrão
          setCardData({
            type: "x",
            number: "xxxxxxxxxxxxxxxx",
            expiryDate: "xx/xx",
            expiryDateFormatted: "xx/xx",
            cardholderName: "xxxxxxxx",
          });
        }
      } catch (error) {
        console.error(error);
        // Em caso de erro, preencha os dados com valores padrão
        setCardData({
          type: "x",
          number: "xxxxxxxxxxxxxxxx",
          expiryDate: "xx/xx",
          expiryDateFormatted: "xx/xx",
          cardholderName: "xxxxxxxx",
        });
      }
    };

    fetchCardData();
  }, [userId]);

  return (
    <div className={styles.card}>
      <div className={styles.cardInfo}>
        <div className={styles.cardLogo}></div>
        <div className={styles.cardChip}>
          {/* SVG para o chip do cartão */}
        </div>
        <div className={styles.cardType}>{cardData.type}</div>
        <div className={styles.cardNumber}>
          <span className={styles.cardDigitGroup}>{cardData.number.slice(0, 4)}</span>
          <span className={styles.cardDigitGroup}>{cardData.number.slice(4, 8)}</span>
          <span className={styles.cardDigitGroup}>{cardData.number.slice(8, 12)}</span>
          <span className={styles.cardDigitGroup}>{cardData.number.slice(12, 16)}</span>
        </div>
        <div className={styles.cardValidThru} aria-label="Valid thru">
          Valid
          <br />
          thru
        </div>
        <div className={styles.cardExpDate}>
          <time dateTime={cardData.expiryDate}>{cardData.expiryDateFormatted}</time>
        </div>
        <div className={styles.cardName} aria-label={cardData.cardholderName}>
          {cardData.cardholderName}
        </div>
        <div
          className={styles.cardVendor}
          role="img"
          aria-labelledby="card-vendor"
        >
          <span id="card-vendor" className={styles.cardVendorSr}>
            {cardData.type}
          </span>
        </div>
        <div className={styles.cardTexture}></div>
      </div>
    </div>
  );
};

export default Card;
