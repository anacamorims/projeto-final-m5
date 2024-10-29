import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import Loader from "../../../components/loader/loader";
import Animation from "../../../components/backgroundAnim/animation";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BuildIcon from "@mui/icons-material/Build";
import GavelIcon from "@mui/icons-material/Gavel";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ModalComponent from "../../../components/ModalProfile/modalProfile";
import TagRoundedIcon from "@mui/icons-material/TagRounded";

const ProfilePage = () => {
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  // Fetch user data on mount
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

        if (!response.ok) throw new Error("Erro ao buscar dados do usuário");

        const data = await response.json();
        setUserData(data);
        setName(data.name || "");
        setEmail(data.email || "");
        setContactNumber(data.contactNumber || "");
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  // Update profile function
  const handleUpdateProfile = async () => {
    setLoading(true);
    const formData = { name, email, contactNumber };

    try {
      const response = await fetch(
        `https://projeto-final-m5-api.onrender.com/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Erro ao atualizar perfil");

      const updatedUser = await response.json();
      setUserData(updatedUser);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  // Modal controls
  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "Conta":
        return (
          <div className={styles.profileInfo}>
            <div className={styles.input_field}>
              <input
                required
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Nome</label>
              <span className={styles.icon}>
                <TagRoundedIcon />
              </span>
            </div>

            <div className={styles.input_field}>
              <input
                required
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>E-mail</label>
              <span className={styles.icon}>
                <TagRoundedIcon />
              </span>
            </div>

            <div className={styles.input_field}>
              <input
                required
                name="contactNumber"
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="(99) 99999-9999"
              />
              <label>Telefone</label>
              <span className={styles.icon}>
                <TagRoundedIcon />
              </span>
            </div>

            <div className={styles.SaveProfile}>
              <button
                onClick={handleUpdateProfile}
                disabled={loading}
                style={{ marginTop: "20px" }}
              >
                {loading ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </div>
        );
      case "Serviços":
        return (
          <div className={styles.modalContent}>
            <ul className={styles.contentBody}>
              <li>
                <strong>Conta Corrente:</strong> Acesse sua conta corrente com
                facilidade e controle total sobre suas finanças.
              </li>
              <li>
                <strong>Cartão de Crédito:</strong> Solicite um cartão de
                crédito com limite flexível e condições especiais.
              </li>
              <li>
                <strong>Transferências:</strong> Faça transferências nacionais e
                internacionais com taxas reduzidas.
              </li>
              <li>
                <strong>Investimentos:</strong> Acesse uma variedade de opções
                de investimento, desde CDBs até fundos de investimento.
              </li>
              <li>
                <strong>Empréstimos:</strong> Solicite empréstimos pessoais com
                taxas de juros competitivas.
              </li>
            </ul>
          </div>
        );
      case "Termos de Uso":
        return (
          <div className={styles.modalContent}>
            <p className={styles.contentBody}>
              Estes Termos de Uso estabelecem as condições sob as quais você
              pode usar os serviços oferecidos por nosso banco digital. Ao usar
              nossos serviços, você concorda com estes termos.
            </p>
            <p className={styles.contentBody}>
              O uso do serviço é permitido apenas para usuários maiores de 18
              anos e que tenham capacidade legal. Reservamo-nos o direito de
              modificar estes termos a qualquer momento.
            </p>
          </div>
        );
      case "Política de Privacidade":
        return (
          <div className={styles.modalContent}>
            <p className={styles.contentBody}>
              Nossa Política de Privacidade descreve como coletamos, usamos e
              protegemos suas informações pessoais. Nós nos comprometemos a
              proteger sua privacidade e a tratar suas informações de forma
              segura.
            </p>
            <p className={styles.contentBody}>
              Coletamos dados pessoais, como nome, e-mail, CPF e informações
              financeiras, apenas com o seu consentimento. Essas informações são
              usadas para fornecer nossos serviços e podem ser compartilhadas
              com instituições financeiras parceiras para a realização de
              transações.
            </p>
            <p className={styles.contentBody}>
              Você pode acessar, corrigir ou excluir suas informações a qualquer
              momento. Para mais detalhes, consulte a seção de gerenciamento de
              conta em nosso aplicativo.
            </p>
          </div>
        );
      case "Ajuda":
        return (
          <div className={styles.modalContent}>
            <p className={styles.contentBody}>
              Se você precisar de ajuda, nossa equipe de suporte está disponível
              24/7 para responder suas perguntas e resolver problemas. Você pode
              nos contatar através dos seguintes canais:
            </p>
            <ul className={styles.contentBody}>
              <li>
                <strong>Email:</strong> suporte@bancodigital.com
              </li>
              <li>
                <strong>Telefone:</strong> 0800-123-456
              </li>
              <li>
                <strong>Chat ao Vivo:</strong> Acesse nosso aplicativo e inicie
                um chat com um de nossos atendentes.
              </li>
            </ul>
            <p className={styles.contentBody}>
              Para perguntas frequentes, consulte nossa seção de FAQ em nosso
              site.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case "Conta":
        return "Editar Conta";
      case "Serviços":
        return "Serviços Disponíveis";
      case "Termos de Uso":
        return "Termos de Uso";
      case "Política de Privacidade":
        return "Política de Privacidade";
      case "Ajuda":
        return "Ajuda";
      default:
        return "";
    }
  };

  if (!userData) return <Loader />;

  return (
    <>
      <Animation />
      <div className={styles.profilePage}>
        <div className={styles.headerProfile}>
          <div className={styles.headerContent}>
            <div className={styles.iconProfile}>
              <AccountCircleRoundedIcon />
            </div>
            <div className={styles.headerText}>
              <h2>{userData.name || "Carregando..."}</h2>
              <h5>{userData.accountNumber || "Carregando..."}</h5>
            </div>
          </div>
        </div>
        <div className={styles.profileOptions}>
          <div className={styles.optionsTop}>
            <div className={styles.buttonsTop}>
              <button
                className={styles.optionButton}
                onClick={() => handleOpenModal("Conta")}
              >
                <MonetizationOnIcon style={{ marginRight: "0.5rem" }} />
                Conta{" "}
                <ArrowForwardIosRoundedIcon style={{ marginLeft: "auto" }} />
              </button>
              <button
                className={styles.optionButton}
                onClick={() => handleOpenModal("Serviços")}
              >
                <BuildIcon style={{ marginRight: "0.5rem" }} />
                Serviços{" "}
                <ArrowForwardIosRoundedIcon style={{ marginLeft: "auto" }} />
              </button>
            </div>
            <div className={styles.buttonsBottom}>
              <button
                className={styles.optionButton}
                onClick={() => handleOpenModal("Termos de Uso")}
              >
                <GavelIcon style={{ marginRight: "0.5rem" }} />
                Termos de uso{" "}
                <ArrowForwardIosRoundedIcon style={{ marginLeft: "auto" }} />
              </button>
              <button
                className={styles.optionButton}
                onClick={() => handleOpenModal("Política de Privacidade")}
              >
                <PrivacyTipIcon style={{ marginRight: "0.5rem" }} />
                Política de privacidade{" "}
                <ArrowForwardIosRoundedIcon style={{ marginLeft: "auto" }} />
              </button>
              <button
                className={styles.optionButton}
                onClick={() => handleOpenModal("Ajuda")}
              >
                <HelpOutlineIcon style={{ marginRight: "0.5rem" }} />
                Ajuda{" "}
                <ArrowForwardIosRoundedIcon style={{ marginLeft: "auto" }} />
              </button>
            </div>
          </div>
          <button className={styles.logoutButton}>Sair</button>
        </div>

        <ModalComponent
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          title={getModalTitle()} // Passando o título do modal
        >
          {renderModalContent()}
        </ModalComponent>
      </div>
    </>
  );
};

export default ProfilePage;
