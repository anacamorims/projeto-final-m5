import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../styles/style-form-default/StyleFormDefault.module.css";
import BackButton from "../../components/back-button/BackButton";
import InputForm from "../../components/input-form/InputForm";
import ButtonDefault from "../../components/button-default/ButtonDefault";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Both email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://projeto-final-m5-api.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userId", data.userId);

        setTimeout(() => {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId");
          console.log("Token removido do localStorage após 1 hora.");
        }, 3600000);

        const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
        if (!hasSeenOnboarding) {
          navigate("/onboarding");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(data.message || "Login failed, please try again.");
      }
    } catch (error) {
      setError("Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.container_form}>
      <BackButton to="/" />
      
      <h1 className={style.title__form}>Login</h1>

      {error && <p className={style.error_message}>{error}</p>}{" "}

      <form onSubmit={handleSubmit}>
        <InputForm
          label="Email"
          type="email"
          icon={EmailOutlinedIcon}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputForm
          label="Senha"
          type="password"
          icon={LockOutlinedIcon}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <ButtonDefault
          name={loading ? "Signing In..." : "Sign In"}
          disabled={loading}
          onClick={handleSubmit}
        />
      </form>
      <span className={style.CreateUserLink}>
          Ainda não tem uma conta? <a href="/sign/up">Crie uma agora</a>
        </span>
    </div>
  );
}
