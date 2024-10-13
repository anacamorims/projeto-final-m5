import React, { useEffect, useState } from "react";
import styles from "./transfer.module.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import TagRoundedIcon from "@mui/icons-material/TagRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import Loader from "./../../../components/loader/loader";
import Animation from './../../../components/backgroundAnim/animation';

export default function Transfer() {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    receiverId: "",
    amount: "",
    description: "",
  });
  const userId = localStorage.getItem("userId");

  // Carrega os dados do usuário ao montar o componente
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

        if (!response.ok) {
          throw new Error("Erro ao buscar dados do usuário");
        }

        const data = await response.json();
        setUserData(data); // Armazena os dados do usuário no estado
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // Lida com a submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se userData e formData são válidos
    if (!userData || !userData.accountNumber) {
      console.error("Dados do usuário não carregados corretamente:", userData);
      alert("Erro: dados do usuário não carregados.");
      return;
    }

    // Validação dos dados do formulário
    if (
      !formData.receiverId ||
      !formData.amount ||
      isNaN(formData.amount) ||
      parseFloat(formData.amount) <= 0
    ) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    try {
      const payload = {
        senderAccountNumber: String(userData.accountNumber), // Alterado para senderAccountNumber
        receiverAccountNumber: String(formData.receiverId), // Alterado para receiverAccountNumber
        amount: parseFloat(formData.amount),
        type: "transfer",
        description: formData.description,
      };

      console.log("Payload enviado:", payload); // Verifica o payload

      const response = await fetch(
        "https://projeto-final-m5-api.onrender.com/api/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Captura o erro retornado
        console.error("Erro da API:", errorData);
        alert(`Erro na transferência: ${errorData.message}`);
        return;
      }

      alert("Transferência realizada com sucesso!");
      setFormData({ receiverId: "", amount: "", description: "" });
    } catch (error) {
      console.error("Erro ao realizar transferência:", error);
      alert("Falha na transferência.");
    }
  };

  if (!userData) return <Loader />; // Exibe mensagem de carregamento enquanto busca os dados

  return (
    <>
      <Animation />

      <section className={styles.container}>
        <nav className={styles.navbar}>
          <div className={styles.avatarUser}>
            <AccountCircleRoundedIcon />
          </div>
          <div className={styles.welcomeText}>
            <h4>{userData ? userData.name : "Carregando..."}</h4>
          </div>
        </nav>

        <div className={styles.transferContent}>
          <div className={styles.titleTransfer}>
            <h2>Transferir</h2>
          </div>

          <form className={styles.formTransfer} onSubmit={handleSubmit}>
            <div className={styles.input_field}>
              <input
                required
                name="receiverId"
                type="number"
                value={formData.receiverId}
                onChange={(e) =>
                  setFormData({ ...formData, receiverId: e.target.value })
                }
              />
              <label>Número da conta</label>
              <span className={styles.icon}>
                <TagRoundedIcon />
              </span>
            </div>
            <div className={styles.input_field}>
              <input
                required
                name="amount"
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
              <label>Valor enviado</label>
              <span className={styles.icon}>
                <AttachMoneyRoundedIcon />
              </span>
            </div>
            <div className={styles.textarea_field}>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              ></textarea>
              <label>Descrição</label>
            </div>

            <div className={styles.amount}>
              <h4>Valor disponível</h4>
              <h2>
                <span>R$</span>{" "}
                {userData ? userData.balance.toFixed(2) : "Carregando..."}
              </h2>
            </div>

            <div className={styles.transferButton}>
              <button type="submit">Transferir</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
