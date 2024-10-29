import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../styles/style-form-default/StyleFormDefault.module.css";
import BackButton from "../../components/back-button/BackButton";
import InputForm from "../../components/input-form/InputForm";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ButtonDefault from "../../components/button-default/ButtonDefault";
import PersonIcon from "@mui/icons-material/Person";
import InputMask from "react-input-mask";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InfoIcon from "@mui/icons-material/Info"; // Importa ícone de informação
import PasswordStrengthInfo from "../../components/PasswordStrengthInfo/PasswordStrengthInfo"; // Importa o componente de popup

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false); // Novo estado para controle do popup
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      setPasswordStrength(validatePassword(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { name, contactNumber, email, password } = formData;

    if (!name || !contactNumber || !email || !password) {
      setError("Todos os campos são obrigatórios.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Email inválido.");
      setLoading(false);
      return;
    }

    if (!validatePhoneNumber(contactNumber)) {
      setError("O número de telefone deve ter 11 dígitos.");
      setLoading(false);
      return;
    }

    if (passwordStrength !== "Forte") {
      setError("A senha deve ser forte.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://projeto-final-m5-api.onrender.com/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, contactNumber, email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userId", data.userId);
        navigate("/sign/in");
      } else {
        setError(
          data.message || "Falha ao criar a conta, por favor tente novamente."
        );
      }
    } catch (error) {
      setError("Ocorreu um erro, por favor tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const cleanedNumber = phoneNumber.replace(/\D/g, "");
    return cleanedNumber.length === 11;
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Fraca";
    }
    if (password.length >= 6 && password.length <= 12) {
      const hasLetters = /[a-zA-Z]/.test(password);
      const hasNumbers = /\d/.test(password);
      return hasLetters && hasNumbers ? "Media" : "Fraca";
    }
    if (password.length > 12) {
      const hasLetters = /[a-zA-Z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      return hasLetters && hasNumbers && hasSpecialChars ? "Forte" : "Media";
    }
    return "Fraca";
  };

  return (
    <div className={style.container_form}>
      <BackButton to="/" />
      <h1 className={style.title__form}>Cadastro</h1>

      {error && <p className={style.error_message}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <InputForm
          label="Nome Completo"
          type="text"
          icon={PersonIcon}
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <InputForm
          label="Número de Telefone"
          icon={PhoneOutlinedIcon}
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          inputComponent={InputMask}
          mask="(99) 99999-9999"
        />

        <InputForm
          label="Email"
          type="email"
          icon={EmailOutlinedIcon}
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <div style={{ position: "relative" }}>
          <InputForm
            label="Senha"
            type={showPassword ? "text" : "password"}
            icon={LockOutlinedIcon}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "25px",
              top: "50%",
              background: "none",
              border: "none",
              cursor: "pointer",
              zIndex: 1,
            }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </button>
        </div>

        {passwordStrength && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <p
              className={`${style.password_strength} ${style[passwordStrength]}`}
            >
              <InfoIcon
                onClick={() => setShowInfoPopup(true)}
                style={{
                  marginLeft: "5px",
                  cursor: "pointer",
                  color: "#6495ed", // Cor do ícone
                }}
              />
              Segurança da senha: {passwordStrength}
            </p>
          </div>
        )}

        {showInfoPopup && (
          <PasswordStrengthInfo onClose={() => setShowInfoPopup(false)} />
        )}

        <ButtonDefault
          name={loading ? "Creating Account..." : "Sign Up"}
          onClick={handleSubmit}
          disabled={loading}
        />
      </form>
      <span className={style.LoginUserDashboard}>
        Já tem uma conta? <a href="/sign/in">Entrar</a>
      </span>
    </div>
  );
}
