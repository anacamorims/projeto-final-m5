import { useEffect, useState } from "react";
import styles from "./card.module.css"; // Mantendo os estilos
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import Animation from "../../../components/backgroundAnim/animation";
import Card from "../../../components/card-bank/card";
import Loader from "../../../components/loader/loader";

export default function Cards() {
  const [modalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [cardData, setCardData] = useState(null);
  const userId = localStorage.getItem("userId");

  const fetchCardData = async () => {
    try {
      const response = await fetch(
        `https://projeto-final-m5-api.onrender.com/${userId}/card`
      );

      if (!response.ok) {
        // Se o cartão não for encontrado, defina cardData como null
        if (response.status === 404) {
          setCardData(null);
          return;
        }
        throw new Error("Erro ao buscar dados do cartão");
      }

      const data = await response.json();

      // Verifique se os dados retornados são um cartão
      if (Array.isArray(data) && data.length > 0) {
        setCardData(data[0]); // Se houver mais de um cartão, usa o primeiro
      } else {
        setCardData(data); // Caso os dados venham como objeto
      }
    } catch (error) {
      console.error("Erro ao buscar dados do cartão:", error);
      setCardData(null); // Defina cardData como null em caso de erro
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://projeto-final-m5-api.onrender.com/api/users/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário", error);
      }
    };

    if (userId) {
      fetchUserData();
      fetchCardData();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    const cardData = {
      numero: "",
      vencimento: "",
      bandeira: "MasterCard",
      codigo_seg: "",
      senha: password,
      tipo: "Debito",
      limite: 5000,
      usuarioId: userId,
    };

    try {
      const response = await fetch(
        `https://projeto-final-m5-api.onrender.com/${userId}/card`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cardData),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao criar o cartão");
      }

      setPassword("");
      setConfirmPassword("");
      setModalOpen(false);
      fetchCardData(); 
    } catch (error) {
      console.error(error);
    }
  };

  if (!userData) return <Loader />;

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
              <h1>Informações do cartão:</h1>
              {cardData ? ( // Verifica se cardData não é null
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
                <p>Cartão não encontrado.</p> // Mensagem se não houver cartão
              )}
            </div>
          </div>

          <button
            className={styles.createCard}
            onClick={() => setModalOpen(true)}
            disabled={!!cardData} // Desabilita o botão se já houver um cartão
          >
            Criar Cartão
          </button>
        </div>
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
              </div>

              <div className={styles.input_field}>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Senha</label>
                <AttachMoneyRoundedIcon className={styles.icon} />
              </div>

              <div className={styles.input_field}>
                <input
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label>Repetir Senha</label>
                <AttachMoneyRoundedIcon className={styles.icon} />
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
}
