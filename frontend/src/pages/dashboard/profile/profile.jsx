import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css"; // Importando os estilos
import Loader from "../../../components/loader/loader";
import translations from "./translations";
import TagRoundedIcon from "@mui/icons-material/TagRounded";
import Animation from "../../../components/backgroundAnim/animation";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const ProfilePage = () => {
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

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
        setFormData({
          name: data.name || "",
          email: data.email || "",
          contactNumber: data.contactNumber || "",
        });
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
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

      if (!response.ok) {
        throw new Error("Erro ao atualizar dados do usuário");
      }

      const updatedData = await response.json();
      setUserData(updatedData);
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao atualizar o perfil.");
    } finally {
      setLoading(false);
    }
  };

  if (!userData) return <Loader />;

  return (
    <>
      <Animation />
      <div className={styles.profilePage}> {/* Usando estilos do módulo */}
        <nav className={styles.navbar}>
          <div className={styles.titleProfile}> 
            <h2>Perfil</h2>
          </div>
        </nav>

        <div className={styles.headerProfile}>
          <div className={styles.iconProfile}>
            <AccountCircleRoundedIcon />
          </div>
          <div className={styles.headerText}>
            <h2>{userData ? userData.name : "Carregando..."}</h2>
            <h5>{userData ? userData.accountNumber : "Carregando..."}</h5>
          </div>
        </div>

        <div className={styles.profileInfo}>
          <div className={styles.input_field}>
            <input
              required
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
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
              value={formData.email}
              onChange={handleInputChange}
            />
            <label>E-mail</label>
            <span className={styles.icon}>
              <TagRoundedIcon />
            </span>
          </div>

          <div className={styles.input_field}>
            <input
              required
              name="phoneNumber"
              type="text"
              value={formData.contactNumber}
              onChange={handleInputChange}
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
      </div>
    </>
  );
};

export default ProfilePage;
