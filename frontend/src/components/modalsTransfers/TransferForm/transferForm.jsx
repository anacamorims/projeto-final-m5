import React, { useEffect, useState } from "react";
import modalStyles from "../modalGlobal.module.css"; // Estilo global do modal
import formStyles from "./transferForm.module.css"; // Estilo específico do formulário
import TagRoundedIcon from "@mui/icons-material/TagRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

export default function ModalTransfer({ onClose }) {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    receiverId: "",
    amount: "",
    description: "",
  });

  const userId = localStorage.getItem("userId");

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
        setUserData(data);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

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
      onClose(); // Fecha o modal após a transferência bem-sucedida
    } catch (error) {
      console.error("Erro ao realizar transferência:", error);
      alert("Falha na transferência.");
    }
  };

  if (!userData) return <div>Carregando...</div>; // Exibe mensagem de carregamento enquanto busca os dados

  return (
    <div className={modalStyles.modal}>
      <button className={modalStyles.closeButton} onClick={onClose}>
        Fechar
      </button>
      <h1>Transferir</h1>
      <form className={formStyles.formTransfer} onSubmit={handleSubmit}>
        <div className={formStyles.input_field}>
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
          <span className={formStyles.icon}>
            <TagRoundedIcon />
          </span>
        </div>

        <div className={formStyles.input_field}>
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
          <span className={formStyles.icon}>
            <AttachMoneyRoundedIcon />
          </span>
        </div>

        <div className={formStyles.textarea_field}>
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

        <div className={formStyles.transferButton}>
          <button type="submit">Transferir</button>
        </div>
      </form>
    </div>
  );
}
