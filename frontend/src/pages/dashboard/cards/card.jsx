import { useEffect, useState } from "react";
import styles from "./card.module.css"; 
import Animation from "../../../components/backgroundAnim/animation";
import Card from "../../../components/card-bank/card";
import Loader from "../../../components/loader/loader";
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded'; // Importação do ícone

const Cards = () => {
  const [cardData, setCardData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [hasCard, setHasCard] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userId = localStorage.getItem("userId"); // Certifique-se de que o ID do usuário está armazenado

  const fetchCardData = async () => {
    try {
      const response = await fetch(
        `https://projeto-final-m5-api.onrender.com/${userId}/card`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar dados do cartão");
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setCardData(data[0]); // Usar o primeiro cartão, se houver mais de um
        setHasCard(true);
      } else {
        setCardData(null); // Garantir que cardData seja nulo se não houver cartões
        setHasCard(false);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do cartão:", error);
    }
  };

  useEffect(() => {
    fetchCardData(); // Chama a função ao montar o componente
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para criar um cartão
    console.log("Criando cartão com senha:", password);
    setModalOpen(false); // Fecha o modal após a criação do cartão
  };

  return (
    <>
      <Animation />
      <section className={styles.container}>
        <nav className={styles.navbar}>
          <div className={styles.titleTransfer}>
            <h2>Cartões</h2>
          </div>
        </nav>

        <div className={styles.transferContent}>
          <div className={styles.cardContent}>
            <div className={styles.card}>
              <Card />
            </div>
            <div className={styles.cardInfo}>
              {cardData ? (
                <>
                  <p>
                    <strong>Número:</strong> {cardData.numero || "N/A"}
                  </p>
                  <p>
                    <strong>Vencimento:</strong> {cardData.vencimento || "N/A"}
                  </p>
                  <p>
                    <strong>Bandeira:</strong> {cardData.bandeira || "N/A"}
                  </p>
                  <p>
                    <strong>Limite:</strong> R$ {cardData.limite || "N/A"}
                  </p>
                  <p>
                    <strong>Tipo:</strong> {cardData.tipo || "N/A"}
                  </p>
                </>
              ) : (
                <p>Carregando informações do cartão...</p>
              )}
            </div>
          </div>
        </div>

        <button
          className={`${styles.createCard} ${hasCard ? styles.disabledButton : ''}`}
          onClick={() => setModalOpen(true)}
          disabled={hasCard}
        >
          Criar Cartão
        </button>
      </section>

      {modalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Criar Cartão</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.radioInput}>
                <label>
                  <input
                    type="radio"
                    name="cardType"
                    value="debito"
                    checked
                    readOnly
                  />
                  <span>Débito</span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="cardType"
                    value="credito"
                    disabled
                  />
                  <span>Crédito</span>
                </label>

                <span className={styles.selection}></span>
              </div>
              <div className={styles.input_field}>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Senha</label>
                <span className={styles.icon}>
                  <AttachMoneyRoundedIcon />
                </span>
              </div>

              <div className={styles.input_field}>
                <input
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label>Repetir Senha</label>
                <span className={styles.icon}>
                  <AttachMoneyRoundedIcon />
                </span>
              </div>

              <button type="submit">Criar</button>
              <button type="button" onClick={() => setModalOpen(false)}>
                Fechar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Cards;
