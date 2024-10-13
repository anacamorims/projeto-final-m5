import React, { useEffect, useState } from 'react';
import './Profile.css'; // Import the responsive CSS file
import Loader from "../../../components/loader/loader";
import translations from './translations';

const ProfilePage = () => {
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    JSON.parse(localStorage.getItem("notificationsEnabled")) || false
  );
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || 'en'
  );

  // Estados para controlar a visibilidade dos textos
  const [showContact, setShowContact] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

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

    fetchUserData();
  }, [userId]);

  const toggleNotifications = () => {
    setLoading(true);
    const updatedStatus = !notificationsEnabled;

    setNotificationsEnabled(updatedStatus);
    localStorage.setItem("notificationsEnabled", JSON.stringify(updatedStatus));

    setLoading(false);
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage); // Salva a nova linguagem no local storage
  };

  // Funções para alternar a visibilidade dos textos
  const toggleContact = () => setShowContact((prev) => !prev);
  const toggleHelp = () => setShowHelp((prev) => !prev);
  const togglePrivacy = () => setShowPrivacy((prev) => !prev);

  if (!userData) return <Loader />;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2>{translations[language].title}</h2>
        <p>{userData.name}</p>
        <p>{userData.email}</p>
        <p>{userData.phone}</p>
      </div>

      <div className="profile-options">
        <button>{translations[language].editProfile}</button>
        <div className="profile-option">
          <span>{translations[language].notifications}</span>
          <span 
            onClick={toggleNotifications} 
            style={{ cursor: 'pointer', color: notificationsEnabled ? 'green' : 'red' }} // Estilizando para parecer um botão
          >
            {notificationsEnabled ? 'ON' : 'OFF'}
          </span>  
        </div>
        <div className="profile-option">
          <span>{translations[language].language}</span>
          <select onChange={(e) => changeLanguage(e.target.value)} value={language}>
            <option value="en">English</option>
            <option value="pt">Português</option>
          </select>
        </div>
        <div className="profile-option">
          <span>{translations[language].security}</span>
        </div>
        <div className="profile-option">
          <span>{translations[language].theme}</span>
          <span>{userData.theme || 'Light mode'}</span>
        </div>
      </div>

      <div className="profile-footer">
        <button onClick={toggleHelp}>{translations[language].helpSupport}</button>
        {showHelp && <p>Perguntas frequentes.</p>}

        <button onClick={toggleContact}>{translations[language].contactUs}</button>
        {showContact && <p>Entre em contato via e-mail: support@gmail.com.</p>}

        <button onClick={togglePrivacy}>{translations[language].privacyPolicy}</button>
        {showPrivacy && <p>Todos os direitos reservados e protegidos.</p>}
      </div>
    </div>
  );
};

export default ProfilePage;
