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
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const navigate = useNavigate();

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
                <strong>Gerar QR Code de Pagamento:</strong> Gere QR Codes para
                facilitar o recebimento de pagamentos de forma rápida e segura.
              </li>
              <li>
                <strong>Scanner de QR Code:</strong> Utilize nosso scanner
                integrado para realizar pagamentos instantâneos através de QR
                Codes.
              </li>
            </ul>
          </div>
        );
      case "Termos de Uso":
        return (
          <div className={styles.modalContent}>
            <p className={styles.contentBody}>
              Estes Termos de Uso estabelecem as condições sob as quais você
              pode usar os serviços oferecidos pelo banco digital "Lunar Pay". É
              importante destacar que o "Lunar Pay" é um projeto acadêmico e
              fictício, criado para fins educacionais e não representa uma
              instituição financeira real.
            </p>
            <p className={styles.contentBody}>
              Ao utilizar nossos serviços, você concorda em cumprir estes
              termos. O uso do serviço é permitido apenas para usuários maiores
              de 18 anos e que tenham capacidade legal. Reservamo-nos o direito
              de modificar estes termos a qualquer momento, e recomendamos que
              você os revise periodicamente.
            </p>
            <p className={styles.contentBody}>
              Os serviços oferecidos pelo "Lunar Pay" são simulados e não
              envolvem transações financeiras reais. Todas as informações
              fornecidas neste aplicativo são fictícias e têm como objetivo
              proporcionar uma experiência de aprendizado.
            </p>
            <p className={styles.contentBody}>
              A sua privacidade é importante para nós. Embora não coletamos
              informações pessoais reais, incentivamos você a não compartilhar
              dados sensíveis neste ambiente acadêmico.
            </p>
            <p className={styles.contentBody}>
              Qualquer dúvida sobre estes Termos de Uso deve ser direcionada
              para o responsável pelo projeto acadêmico.
            </p>
          </div>
        );
      case "Política de Privacidade":
        return (
          <div className={styles.modalContent}>
            <p className={styles.contentBody}>
              Nossa Política de Privacidade descreve como gerenciamos
              informações no contexto do banco digital fictício "Lunar Pay". É
              importante notar que, como um projeto acadêmico, recomendamos
              fortemente que você não insira dados reais ou sensíveis, como
              informações pessoais ou financeiras.
            </p>
            <p className={styles.contentBody}>
              No "Lunar Pay", as informações inseridas, como nome, e-mail e
              outras, são armazenadas em um banco de dados para fins de
              simulação e aprendizado. Embora esses dados sejam armazenados,
              eles não serão utilizados para qualquer finalidade além do
              desenvolvimento da experiência do usuário no aplicativo.
            </p>
            <p className={styles.contentBody}>
              Tratamos todos os dados de forma segura, mas, por se tratar de um
              projeto acadêmico, não garantimos proteção total contra acessos
              não autorizados. O foco é proporcionar um ambiente educacional que
              simule a experiência de uso de um banco digital.
            </p>
            <p className={styles.contentBody}>
              Como este é um projeto acadêmico, os dados coletados são fictícios
              e não podem ser acessados, corrigidos ou excluídos, exceto pelos
              desenvolvedores do projeto. Recomendamos que você evite inserir
              informações pessoais sensíveis durante a interação com o "Lunar
              Pay".
            </p>
            <p className={styles.contentBody}>
              Qualquer dúvida sobre nossa Política de Privacidade deve ser
              direcionada ao responsável pelo projeto acadêmico.
            </p>
          </div>
        );
      case "Ajuda":
        return (
          <div className={styles.modalContent}>
          <p className={styles.contentBody}>
            Se você precisar de ajuda, nossa equipe de desenvolvimento está disponível
            24/7 para responder suas perguntas e resolver problemas. Você pode
            entrar em contato diretamente com os desenvolvedores através dos seguintes canais:
          </p>
          <h3 className={styles.contentBody}>
            Contato com a Equipe de Desenvolvimento:
          </h3>
          <p className={styles.contentBody}>
            Para mais informações ou questões específicas, você pode entrar em
            contato diretamente com nossa equipe de desenvolvimento:
          </p>
          <ul className={styles.contentBody}>
            <li>
              <strong>Nome:</strong> Kauã Kelvyn <br />
              <strong>Título:</strong> Dev Fullstack <br />
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://www.linkedin.com/in/dev-kauã/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kauã Kelvyn
              </a>{" "}
              <br />
              <strong>GitHub:</strong>{" "}
              <a
                href="https://github.com/Kerubink"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kerubink
              </a>{" "}
              <br />
            </li>
            <br />
            <li>
              <strong>Nome:</strong> Ana Carolina <br />
              <strong>Título:</strong> Dev Fullstack <br />
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://www.linkedin.com/in/ana-carolina-amorim-de-souza/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ana Carolina
              </a>{" "}
              <br />
              <strong>GitHub:</strong>{" "}
              <a
                href="https://github.com/anacamorims"
                target="_blank"
                rel="noopener noreferrer"
              >
                anacamorims
              </a>{" "}
              <br />
            </li>
            <br />
            <li>
              <strong>Nome:</strong> Janine Cruz <br />
              <strong>Título:</strong> Dev Fullstack <br />
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://www.linkedin.com/in/janine-cruz "
                target="_blank"
                rel="noopener noreferrer"
              >
                Janine Cruz
              </a>{" "}
              <br />
              <strong>GitHub:</strong>{" "}
              <a
                href="https://github.com/JanineCruz921"
                target="_blank"
                rel="noopener noreferrer"
              >
                JanineCruz921
              </a>{" "}
              <br />
            </li>
            <br />
            <li>
              <strong>Nome:</strong> Beatriz Ferreira <br />
              <strong>Título:</strong> Dev Fullstack <br />
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://www.linkedin.com/in/beatriz-ferreira"
                target="_blank"
                rel="noopener noreferrer"
              >
                Beatriz Ferreira
              </a>{" "}
              <br />
              <strong>GitHub:</strong>{" "}
              <a
                href="https://github.com/l1Beatriz"
                target="_blank"
                rel="noopener noreferrer"
              >
                l1Beatriz
              </a>{" "}
              <br />
            </li>
            <br />
            <li>
              <strong>Nome:</strong> Gabriel Ferreira <br />
              <strong>Título:</strong> Dev Fullstack <br />
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://www.linkedin.com/in/claytonbahia?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gabriel Ferreira
              </a>{" "}
              <br />
              <strong>GitHub:</strong>{" "}
              <a
                href="https://github.com/ogabrielbahia"
                target="_blank"
                rel="noopener noreferrer"
              >
                ogabrielbahia
              </a>{" "}
              <br />
            </li>
            <br />
            <li>
              <strong>Nome:</strong> Leticia Borges <br />
              <strong>Título:</strong> Dev Fullstack <br />
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://www.linkedin.com/in/leticiaborges-desenvolvedora/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Leticia Borges
              </a>{" "}
              <br />
              <strong>GitHub:</strong>{" "}
              <a
                href="https://github.com/LeticiaBorges06"
                target="_blank"
                rel="noopener noreferrer"
              >
                LeticiaBorges06
              </a>{" "}
              <br />
            </li>
          </ul>
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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");

    navigate("/sign/in");
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
          <button className={styles.logoutButton} onClick={handleLogout}>
            Sair
          </button>
        </div>

        <ModalComponent
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          title={getModalTitle()}
        >
          {renderModalContent()}
        </ModalComponent>
      </div>
    </>
  );
};

export default ProfilePage;
