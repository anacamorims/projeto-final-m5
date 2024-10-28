import React, { useState } from "react";
import styles from "./bottonNav.module.css";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

import Home from "../../pages/dashboard/home/home";
import Cards from "../../pages/dashboard/cards/card";
import Transfer from "../../pages/dashboard/transfer/transfer";
import Profile from "../../pages/dashboard/profile/profile";

const BottomNavigation = () => {
  const [activePage, setActivePage] = useState("home");

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <Home />;
      case "cards":
        return <Cards />;
      case "transfer":
        return <Transfer />;
      case "profile":
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageContent}>{renderPage()}</div>

      <nav className={styles.bottomNavigation}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <button
              className={`${styles.navButton} ${
                activePage === "home" ? styles.active : ""
              }`}
              onClick={() => setActivePage("home")}
            >
              <i className={styles.iconHome}>
                <HomeRoundedIcon />
              </i>
              <span>Home</span>
            </button>
          </li>
          <li className={styles.navItem}>
            <button
              className={`${styles.navButton} ${
                activePage === "cards" ? styles.active : ""
              }`}
              onClick={() => setActivePage("cards")}
            >
              <i className={styles.iconCards}>
                <AccountBalanceWalletRoundedIcon />
              </i>
              <span>Cards</span>
            </button>
          </li>
          <li className={styles.navItem}>
            <button
              className={`${styles.navButton} ${
                activePage === "transfer" ? styles.active : ""
              }`}
              onClick={() => setActivePage("transfer")}
            >
              <i className={styles.iconTransfer}>
                <CurrencyExchangeRoundedIcon />
              </i>
              <span>Transfer</span>
            </button>
          </li>
          <li className={styles.navItem}>
            <button
              className={`${styles.navButton} ${
                activePage === "profile" ? styles.active : ""
              }`}
              onClick={() => setActivePage("profile")}
            >
              <i className={styles.iconProfile}>
                <AccountCircleRoundedIcon />
              </i>
              <span>Profile</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BottomNavigation;
