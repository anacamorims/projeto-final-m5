import { useEffect, useState } from "react";
import styles from "./card.module.css"; // Mantendo os estilos
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";

import Animation from "../../../components/backgroundAnim/animation";
import Card from "../../../components/card-bank/card";
import Loader from "../../../components/loader/loader";

export default function Cards() {
  const [modalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [hasCard, setHasCard] = useState(false); // Estado para verificar se o usuário tem cartão
  const userId = localStorage.getItem("userId");

  // Função para buscar dados do usuário
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

      // Verifica se o usuário já tem um cartão
      if (data.cards && data.cards.length > 0) {
        setHasCard(true); // Se houver cartão, atualiza o estado
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    const cardData = {
      numero: "", // Pode ser gerado automaticamente pela API
      vencimento: "", // Pode ser gerado automaticamente pela API
      bandeira: "MasterCard",
      codigo_seg: "",
      senha: password, // Captura a senha do input
      tipo: "Debito", // Sempre define "Debito" como padrão
      limite: 5000, // Ou outro valor desejado
      usuarioId: userId, // Captura do localStorage ou estado
    };

    try {
      const response = await fetch(
        `https://projeto-final-m5-api.onrender.com/${userId}/card`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Incluindo o token de autenticação
          },
          body: JSON.stringify(cardData),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao criar o cartão");
      }

      // Limpar o formulário e fechar o modal após sucesso
      setPassword("");
      setConfirmPassword("");
      setModalOpen(false);
      fetchUserData(); // Atualiza os dados do usuário após criar o cartão
    } catch (error) {
      console.error(error);
    }
  };

  if (!userData) return <Loader />; // Carregando dados do usuário

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
            <Card />
          </div>

          <button
            className={styles.createCard}
            onClick={() => setModalOpen(true)}
            disabled={hasCard} // Desativa o botão se o usuário já tem um cartão
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
                    checked // O botão de "Débito" sempre estará ativo
                    readOnly // Para impedir alterações
                  />
                  <span>Débito</span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="cardType"
                    value="credito"
                    disabled // Desabilita a opção "Crédito"
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
}
