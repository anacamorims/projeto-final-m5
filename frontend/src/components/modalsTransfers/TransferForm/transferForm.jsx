import React, { useEffect, useState } from "react";
import modalStyles from "../modalGlobal.module.css"; // Estilo global do modal
import formStyles from "./transferForm.module.css"; // Estilo específico do formulário
import TagRoundedIcon from "@mui/icons-material/TagRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

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

  const formatCurrency = (value) => {
    const numericValue = value.replace(/\D/g, ""); // Remove tudo que não é dígito
    return (numericValue / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleAmountChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, ""); // Remove não dígitos
    setFormData((prev) => ({
      ...prev,
      amount: numericValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se userData e formData são válidos
    if (!userData || !userData.accountNumber) {
      console.error("Dados do usuário não carregados corretamente:", userData);
      alert("Erro: dados do usuário não carregados.");
      return;
    }

    // Validação dos dados do formulário
    const amountInFloat = parseFloat(formData.amount) / 100;
    if (
      !formData.receiverId ||
      !formData.amount ||
      isNaN(amountInFloat) ||
      amountInFloat <= 0
    ) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    try {
      const payload = {
        senderAccountNumber: String(userData.accountNumber), // Alterado para senderAccountNumber
        receiverAccountNumber: String(formData.receiverId), // Alterado para receiverAccountNumber
        amount: amountInFloat,
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
        <ArrowBackIosNewRoundedIcon />
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
            type="text" // Mudado para "text" para aplicar a máscara
            value={formatCurrency(formData.amount)} // Formata o valor ao exibir
            onChange={handleAmountChange}
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
