// src/pages/onboarding/index.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./onboarding.module.css";

const Onboarding = () => {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [
    {
      title: "Bem-vindo ao Lunar Pay",
      description: "Seu banco digital moderno e fácil de usar.",
      img: "./src/assets/illustration/undraw_mobile_pay_re_sjb8.svg",
    },
    {
      title: "Controle Financeiro",
      description: "Acompanhe suas finanças e transações em tempo real.",
      img: "./src/assets/illustration/undraw_online_payments_re_y8f2.svg",
    },
    {
      title: "Cartões Exclusivos",
      description: "Solicite cartões de débito e crédito com um clique.",
      img: "./src/assets/illustration/undraw_credit_card_re_blml.svg",
    },
  ];

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    if (hasSeenOnboarding) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleNextSlide = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      localStorage.setItem("hasSeenOnboarding", "true");
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className={styles.onboardingAnimation}>
        <div className={styles.circleOne}></div>
        <div className={styles.circleTwo}></div>
        <div className={styles.circleThree}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.slide}>
          <div className={styles.slideImg}>
            <img
              src={slides[slideIndex].img}
              alt={`Onboarding slide ${slideIndex + 1}`}
            />
          </div>

          

          <div className={styles.slideText}>
            <h1>{slides[slideIndex].title}</h1>
            <p>{slides[slideIndex].description}</p>
          </div>

          <div className={styles.pagination}>
            {slides.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  slideIndex === index ? styles.active : ""
                }`}
              ></span>
            ))}
          </div>

          <button className={styles.button} onClick={handleNextSlide}>
            {slideIndex === slides.length - 1 ? "Começar" : "Próximo"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Onboarding;
