import React, { useState } from 'react';
import styles from './bottonNav.module.css'; // Importando o CSS como módulo

import Home from '../../pages/dashboard/home/home';
import Cards from '../../pages/dashboard/cards/card';
import Transfer from '../../pages/dashboard/transfer/transfer';
import Profile from '../../pages/dashboard/profile/profile';

const BottomNavigation = () => {
  // Estado para controlar a página atual
  const [activePage, setActivePage] = useState('home');

  // Função para renderizar a página com base no estado
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'cards':
        return <Cards />;
      case 'transfer':
        return <Transfer />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <nav className={styles.bottomNavigation}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <button
              className={`${styles.navButton} ${activePage === 'home' ? styles.active : ''}`}
              onClick={() => setActivePage('home')}
            >
              <i className={styles.iconHome}></i>
              <span>Home</span>
            </button>
          </li>
          <li className={styles.navItem}>
            <button
              className={`${styles.navButton} ${activePage === 'cards' ? styles.active : ''}`}
              onClick={() => setActivePage('cards')}
            >
              <i className={styles.iconCards}></i>
              <span>Cards</span>
            </button>
          </li>
          <li className={styles.navItem}>
            <button
              className={`${styles.navButton} ${activePage === 'transfer' ? styles.active : ''}`}
              onClick={() => setActivePage('transfer')}
            >
              <i className={styles.iconTransfer}></i>
              <span>Transfer</span>
            </button>
          </li>
          <li className={styles.navItem}>
            <button
              className={`${styles.navButton} ${activePage === 'profile' ? styles.active : ''}`}
              onClick={() => setActivePage('profile')}
            >
              <i className={styles.iconProfile}></i>
              <span>Profile</span>
            </button>
          </li>
        </ul>
      </nav>

      <div className={styles.pageContent}>
        {renderPage()}
      </div>
    </div>
  );
};

export default BottomNavigation;
